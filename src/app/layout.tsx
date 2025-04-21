import { FloatingYoutube } from "@/components/media-player/floating-youtube";
import { MediaProvider } from "@/components/media-player/media-context";
import { MediaControls } from "@/components/media-player/media-controls";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gilliam's Jukebox of Wonders",
  description: "Music for d&d sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-gray-900 text-white px-4">
          <div className="absolute z-0">
            <Image width="180" height={Math.floor((932/997)*180)} src="gilliam.png" alt="Gilliam's Logo" className="pt-6 drop-shadow" />
          </div>
          <MediaProvider>
            <div className="h-[calc(100vh-0rem)] overflow-y-auto">
              {children}
            </div>
          <MediaControls />
          <FloatingYoutube />
        </MediaProvider>
        </div>
      </body>
    </html>
  );
}
