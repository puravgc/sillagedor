import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import SessionProviderWrapper from "@/app/components/session/SessionProviderWrapper";
import LoginAlert from "@/app/components/loginalert/LoginAlert";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Sillage D'or",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased max-h-screen w-screen flex flex-col`}
      >
        <SessionProviderWrapper>
          <LoginAlert /> {/* Mounts early to check for query param */}
          <Navbar />
          <div className="flex-1 overflow-auto overflow-x-hidden w-full">
            {children}
            <Footer />
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
