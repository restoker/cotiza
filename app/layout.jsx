import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "App de cotizaciones",
  description: "Una app para cotizar productos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-zinc-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <Layout>
          <Toaster />
          {children}
        </Layout>
      </body>
    </html>
  );
}
