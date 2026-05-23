import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salon Afrodita Chișinău",
  description: "Salon premium în Chișinău — îngrijire facială, laser, injectabile și masaj.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
