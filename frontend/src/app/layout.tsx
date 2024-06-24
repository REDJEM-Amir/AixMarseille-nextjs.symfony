import "../styles/globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "LoveComics - Votre destination pour des comics gratuits en ligne",
  description: "Bienvenue sur LoveComics, votre plateforme ultime pour lire des comics gratuitement. Plongez dans un univers fascinant de super-héros, de mondes fantastiques et d'aventures captivantes. Avec une vaste collection de titres variés, LoveComics vous offre une expérience de lecture immersive et accessible à tous les amateurs de bandes dessinées. Explorez, découvrez et laissez-vous emporter par nos histoires uniques, mises à disposition gratuitement pour votre plus grand plaisir. Que vous soyez un lecteur occasionnel ou un véritable passionné, LoveComics est l'endroit idéal pour satisfaire votre soif de récits palpitants."
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
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
