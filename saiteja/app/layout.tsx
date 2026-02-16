import type { Metadata } from "next";
import { Roboto, Quantico } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "900"],
});

const quantico = Quantico({
  variable: "--font-quantico",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Saiteja Dasari | Robotics Engineer",
  description: "Robotics engineer building autonomous robots with ROS2, drone control systems, and computer vision. MS Robotics at Arizona State University.",
  keywords: ["robotics", "ROS2", "autonomous systems", "computer vision", "drone control", "UAV"],
  authors: [{ name: "Saiteja Dasari" }],
  openGraph: {
    title: "Saiteja Dasari | Robotics Engineer",
    description: "Building autonomous robots with ROS2, drone control systems, and computer vision.",
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
        className={`${roboto.variable} ${quantico.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
