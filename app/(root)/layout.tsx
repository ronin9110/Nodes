import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";

const jost = Jost({
  subsets: ['latin'], // Use appropriate subsets
})


export const metadata :Metadata ={
    title:"Nodes",
    description:"Nodes App by Next.js"
}  

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${jost.className} antialiased`}
        >
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-6xl">{children}</div>
            </section>
            {/* <RightSidebar /> */}
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
