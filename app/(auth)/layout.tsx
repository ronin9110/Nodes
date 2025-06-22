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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#727272",
          colorInputText: "#b2b2b2",
          colorBackground: "#000000",
          colorText: "#ffffff",
          colorTextSecondary: "#b2b2b2",
          colorNeutral: "#ffffff",
          colorShimmer: "#b2b2b2",
        },
      }}
    >
      <html lang="en">
        <body className="bg-custom-1 justify-center items-center h-full">
          <div className=" h-screen flex items-center justify-center">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
