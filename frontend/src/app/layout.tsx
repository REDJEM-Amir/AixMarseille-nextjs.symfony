import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "Accueil - LoveComics"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <UserProvider>
          <Header />
        </UserProvider>
        {children}
      </body>
    </html>
  );
}
