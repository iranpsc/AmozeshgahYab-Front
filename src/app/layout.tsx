import { azarMehr, rokh } from '@/fonts/localFonts';
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/providers/theme";
import Header from '@/components/layout/header';


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
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${azarMehr.variable} ${rokh.variable} relative`} >
        <ThemeProvider >
          <Header />
          {children}

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
