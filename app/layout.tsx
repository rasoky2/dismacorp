import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Disma Corp - Construcción y Desarrollo de Alto Nivel",
  description:
    "Especialistas en obras civiles, instalaciones eléctricas y soluciones estructurales internacionales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased font-sans">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
