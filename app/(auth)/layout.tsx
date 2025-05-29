import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "Nodes",
  description: "Nodes App by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-dark-1">{children}</body>
      </html>
    </ClerkProvider>
  );
}
