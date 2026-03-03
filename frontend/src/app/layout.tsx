import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectMarcy — For Salespeople",
  description:
    "A safe, anonymous space for salespeople to vent, connect, share memes, and de-stress.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
