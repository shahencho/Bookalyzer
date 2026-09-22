import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/layout/TopNav";
import { LangProvider } from "@/components/layout/LangProvider";

export const metadata: Metadata = {
  title: "Bookalyzer",
  description: "Structured reading assessments that motivate children toward whole books.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bk-root w-full min-h-screen">
        <LangProvider>
          <TopNav />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
