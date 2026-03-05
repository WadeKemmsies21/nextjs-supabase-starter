import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Supabase Starter",
  description: "Reusable Next.js + Supabase starter template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}