import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { CMSProvider } from "@/lib/cms";
import { LanguageProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import { MonitoringProvider } from "@/lib/monitoring";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "바이칼시스템즈 - VIBE CODING 웹사이트",
  description: "AI와 RPA 기술로 미래를 코딩하는 차세대 혁신 파트너",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <MonitoringProvider>
            <AuthProvider>
              <ThemeProvider>
                <CMSProvider>
                  <ToastProvider>
                    {children}
                  </ToastProvider>
                </CMSProvider>
              </ThemeProvider>
            </AuthProvider>
          </MonitoringProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
