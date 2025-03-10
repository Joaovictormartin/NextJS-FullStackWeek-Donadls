import "../styles/globals.css";

import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Providers } from "@/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FSW Donalds",
  icons: "/favicon.ico",
  description: "Full Stack Week Donalds",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
