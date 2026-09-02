const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  // fail-fast در build/dev، بهتر از خطای مبهم fetch بعداً
  throw new Error("NEXT_PUBLIC_API_URL تنظیم نشده — .env.local را چک کنید");
}

type FetchOptions = {
  /** ثانیه‌های ISR (کش سمت سرور Next). پیش‌فرض ۵ دقیقه. */
  revalidateSeconds?: number;
  signal?: AbortSignal;
};

/** خطای API با status code واقعی، تا caller بتونه مثلاً 404 رو جدا از بقیه‌ی خطاها هندل کنه */
export class ApiError extends Error {
  status: number;
  constructor(status: number, path: string) {
    super(`درخواست API ناموفق بود (${status}): ${path}`);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * fetch اختصاصی API با base URL ثابت، تایم‌اوت، و کشِ ISR.
 * همیشه از این استفاده کنید، نه fetch مستقیم — تا رفتار کش/خطا یکدست بمونه.
 *
 * سمت سرور (Server Component/Route Handler) مستقیم به API خارجی می‌زنه —
 * سرور-به-سرور، CORS اصلاً معنی نداره، هم سریع‌تره.
 * سمت کلاینت (مرورگر، مثل SearchModal) از پروکسی هم‌مبدأ خودمون
 * (src/app/api/proxy/[...path]/route.ts) رد می‌شه، چون مرورگر مستقیم به
 * دامنه‌ی خارجی که هدر CORS نداره بلاک می‌شه.
 */
export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidateSeconds = 300, signal } = options;

  const isServer = typeof window === "undefined";
  const baseUrl = isServer ? API_BASE_URL : "/api/proxy";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${baseUrl}${path}`, {
      signal: signal ?? controller.signal,
      ...(isServer ? { next: { revalidate: revalidateSeconds } } : {}),
    });

    if (!res.ok) {
      throw new ApiError(res.status, path);
    }

    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export function buildQueryString(
  params: Record<string, string | number | undefined>
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}