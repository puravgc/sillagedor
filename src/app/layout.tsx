import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

// Import Montserrat font
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add weights as per your design
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
      <body className={`${montserrat.variable} antialiased h-screen w-screen`}>
        <Navbar />
        <div className="">{children}</div>
      </body>
    </html>
  );
}
