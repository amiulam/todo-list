import GridBackground from "@/components/grid-background";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo List App",
  description: "A beautiful and functional todo list application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GridBackground />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
