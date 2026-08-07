import type { Metadata } from "next";
import { Cinzel, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { EmberCursor } from "@/components/EmberCursor";
import { Footer } from "@/components/Footer";
import { MotionShell } from "@/components/MotionShell";
import { Nav } from "@/components/Nav";
import { PaperBackground } from "@/components/PaperBackground";
import "./globals.css";

const display = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://snapdraken.paskerventures.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Snapdraken — One More World Is Taking Shape",
    template: "%s — Snapdraken",
  },
  description:
    "One more world is taking shape—this one lives online. The Snapdraken shop is still open and building impossible places.",
  keywords: [
    "themed environment design",
    "specialty fabrication",
    "scenic fabrication",
    "production design",
    "Travis Crumbaker",
    "Snapdraken",
  ],
  icons: {
    icon: "/logo/snapdraken-dragon.svg",
    shortcut: "/logo/snapdraken-dragon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Snapdraken",
    title: "Snapdraken — One more world is taking shape. This one lives online.",
    description: "New site in fabrication. The Snapdraken shop is still open.",
    images: [
      {
        url: "/og-construction-v3.png",
        width: 1200,
        height: 630,
        alt: "Snapdraken dragon mark with the message: One more world is taking shape. This one lives online.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapdraken — One More World Is Taking Shape",
    description: "New site in fabrication. The Snapdraken shop is still open.",
    images: ["/og-construction-v3.png"],
  },
  alternates: {
    canonical: "/",
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
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <PaperBackground />
        <EmberCursor />
        <Nav />
        <MotionShell>{children}</MotionShell>
        <Footer
          instagramUrl={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
          linkedInUrl={process.env.NEXT_PUBLIC_LINKEDIN_URL}
        />
      </body>
    </html>
  );
}
