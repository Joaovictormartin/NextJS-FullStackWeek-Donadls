import "../styles/globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

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
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
