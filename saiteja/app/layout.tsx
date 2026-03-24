import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Saiteja Dasari | Robotics Engineer",
  description:
    "Robotics engineer building autonomous systems with ROS2, UAV control, and computer vision. MS Robotics at Arizona State University.",
  keywords: [
    "robotics",
    "ROS2",
    "autonomous systems",
    "computer vision",
    "drone control",
    "UAV",
    "ASU",
  ],
  authors: [{ name: "Saiteja Venkateshwa Rao Dasari" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${fraunces.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-body bg-surface text-on-surface">
        {children}
        <Script src="/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
