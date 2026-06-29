import { azarMehr, rokh } from '@/fonts/localFonts';
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";



export const metadata: Metadata = {
  title: "آموزشگاه یاب",
  description: "سامانه مرکزی مدیریت آموزشگاه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${azarMehr.variable} ${rokh.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
