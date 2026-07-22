import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Just — For You",
  description: "A beautiful, personal love letter crafted just for you.",
  openGraph: {
    title: "Just — For You",
    description: "Every day with you is my favorite day.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
