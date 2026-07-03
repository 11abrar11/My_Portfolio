import type { Metadata } from "next";
import { Space_Grotesk, Manrope, Cormorant_Garamond } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mohammedabrarhussain.com"),
  title: "Mohammed Abrar Hussain | AI Engineer & Developer",
  description: "Portfolio of Mohammed Abrar Hussain, building production-ready AI systems, automated workflows, and full-stack applications.",
  keywords: ["AI Engineer", "Software Developer", "Full Stack", "Next.js", "Mohammed Abrar Hussain", "11abrar11", "Machine Learning", "Portfolio"],
  authors: [{ name: "Mohammed Abrar Hussain" }],
  openGraph: {
    title: "Mohammed Abrar Hussain | AI Engineer",
    description: "Premium 3D Interactive AI Engineer Portfolio",
    type: "website",
    url: "https://www.mohammedabrarhussain.com", 
    siteName: "Mohammed Abrar Hussain Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Abrar Hussain | AI Engineer",
    description: "Premium 3D Interactive AI Engineer Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${cormorant.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-blue-500/30">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
