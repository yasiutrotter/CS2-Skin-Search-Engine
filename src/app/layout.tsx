import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'

const poppins = Poppins(
  {
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin-ext"],
  }
)

export const metadata: Metadata = {
  title: "Browse and search for CS2 skins",
  description: "Search and explore Counter-Strike 2 skins with ease. View detailed information like weapon names, patterns, and images in this user-friendly skin search engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`{poppins.className} antialiased bg-gray-950 text-[#fbfbfb]`}
      >
        {children}
      </body>
    </html>
  );
}
