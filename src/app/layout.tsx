import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manual 2.0 — Care Plan Control Planes",
  description: "Configuration interfaces for Manual 2.0's care plan architecture",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
