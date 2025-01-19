import type { Metadata } from "next";
import "./globals.css";


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
        className={`antialiased bg-gray-950 text-[#fbfbfb]`}
      >
        {children}
      </body>
    </html>
  );
}
