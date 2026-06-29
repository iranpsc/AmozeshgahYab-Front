import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req:NextRequest){


    const access =
    req.cookies.get("access")?.value;



    const isLogin =
    req.nextUrl.pathname === "/login";


    const isDashboard =
    req.nextUrl.pathname.startsWith("/dashboard");


    const isSettings =
    req.nextUrl.pathname.startsWith("/settings");



    if(
        !access &&
        (isDashboard || isSettings)
    ){

        return NextResponse.redirect(
            new URL("/login", req.url)
        );

    }



    if(
        access &&
        isLogin
    ){

        return NextResponse.redirect(
            new URL("/dashboard", req.url)
        );

    }



    return NextResponse.next();

}



export const config = {


    matcher:[

        "/dashboard/:path*",
        "/settings/:path*",
        "/login"

    ]

};