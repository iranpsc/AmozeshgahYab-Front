import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// جلوگیری از refresh های همزمان
let refreshing = false;
let refreshPromise: Promise<any> | null = null;

async function handler(
  req: NextRequest,
  context: {
    params: Promise<{ path: string[] }>;
  }
) {
  const { path } = await context.params;

  const upstreamBase = new URL(API_URL);
  if (upstreamBase.protocol !== "http:" && upstreamBase.protocol !== "https:") {
    return NextResponse.json({ detail: "Invalid upstream API URL." }, { status: 500 });
  }

  const sanitizedSegments = path.map((segment) => {
    const decoded = decodeURIComponent(segment);
    if (
      !decoded ||
      decoded === "." ||
      decoded === ".." ||
      decoded.includes("/") ||
      decoded.includes("\\")
    ) {
      throw new Error("Invalid path segment.");
    }
    return encodeURIComponent(decoded);
  });

  upstreamBase.pathname = `${upstreamBase.pathname.replace(/\/+$/, "")}/${sanitizedSegments.join("/")}`;
  req.nextUrl.searchParams.forEach((value, key) => {
    upstreamBase.searchParams.append(key, value);
  });

  const url = upstreamBase.toString();

  const access = req.cookies.get("access")?.value;
  const refresh = req.cookies.get("refresh")?.value;

  const headers: Record<string, string> = {};

  const contentType = req.headers.get("content-type");
  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  if (access) {
    headers.Authorization = `Bearer ${access}`;
  }

  let body: BodyInit | undefined;

  if (req.method !== "GET" && req.method !== "DELETE") {
    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      body = await req.arrayBuffer();
    } else {
      body = await req.text();
    }
  }

  async function request() {
    return fetch(url, {
      method: req.method,
      headers,
      body,
    });
  }

  let response: Response;
  try {
    response = await request();
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid path segment.") {
      return NextResponse.json({ detail: "Invalid path." }, { status: 400 });
    }
    throw error;
  }

  // console.log("Backend Status:", response.status);

  // const responseText = await response.clone().text();
  // console.log("Backend Body:", responseText);

  // =====================
  // ACCESS EXPIRED
  // =====================
  if (response.status === 401 && refresh && !endpoint.includes("auth/")) {
    console.log("ACCESS EXPIRED");

    if (!refreshing) {
      refreshing = true;

      refreshPromise = fetch(`${API_URL}/auth/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("refresh failed");
          }
          return res.json();
        })
        .finally(() => {
          refreshing = false;
          refreshPromise = null;
        });
    }

    try {
      const tokens = await refreshPromise;
      console.log("REFRESH SUCCESS");

      headers.Authorization = `Bearer ${tokens.access}`;

      response = await request();

      const text = await response.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      const res = NextResponse.json(data, { status: response.status });

      res.cookies.set("access", tokens.access, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });

      return res;
    } catch (error) {
      console.log("REFRESH FAILED");

      const res = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      res.cookies.delete("access");
      res.cookies.delete("refresh");
      return res;
    }
  }

  // =====================
  // LOGIN
  // =====================
  const text = await response.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  const res = NextResponse.json(data, { status: response.status });

  if (endpoint === "auth/login" && response.ok) {
    res.cookies.set("access", data.access, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    res.cookies.set("refresh", data.refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  // =====================
  // LOGOUT
  // =====================
  if (endpoint === "auth/logout") {
    res.cookies.delete("access");
    res.cookies.delete("refresh");
  }

  return res;
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};