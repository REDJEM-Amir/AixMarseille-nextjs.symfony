import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Votre Library en ligne",
  description: "Accès totalement gratuit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <Header />
      <body>{children}</body>
    </html>
  );
}
