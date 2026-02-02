import type { Metadata } from "next";
import { Space_Grotesk, Manrope, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sai Teja - Robotics Engineer | Systems Engineering Portfolio",
  description: "Robotics engineer specializing in autonomous systems, computer vision, control theory, and mechatronics. Bridging the gap between hardware and software.",
  keywords: ["robotics", "engineering", "autonomous systems", "computer vision", "mechatronics", "control systems"],
  authors: [{ name: "Sai Teja" }],
  openGraph: {
    title: "Sai Teja - Robotics Engineer Portfolio",
    description: "Engineering the future of autonomy through intelligent systems and humanoid interfaces",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
