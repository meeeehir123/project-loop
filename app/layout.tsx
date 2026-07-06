import AuthProvider from "@/components/Authprovider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "../components/Navbar";
import ChatWidget from "../components/ChatWidget";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project LOOP — AI Customer-Feedback Intelligence Platform",
  description: "Next-generation telemetry engine mapping user sentiment datasets into actionable, real-time insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-zinc-100 selection:bg-zinc-800 selection:text-white">
        
        <AuthProvider>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          {/* Yahan bhi 'W' capital hona chahiye */}
          <ChatWidget />

          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
          />
        </AuthProvider>
      </body>
    </html>
  );
}