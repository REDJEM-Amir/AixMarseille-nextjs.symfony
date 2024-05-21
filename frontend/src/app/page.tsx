import Comics from "@/components/Comics";
import Trailer from "@/components/Trailer";
import css from "@/styles/page.module.css"

export default function Page() {
  return (
    <div className={css.container}>
      <Trailer />
      <Comics title="Nouveautés sur LoveComics" type="news" />
      <Comics title="Top 10 des comics aujourd'hui : France" type="top" />
      <Comics title="Trouvez votre prochain coup de coeur" type="all" />
    </div>
  );
}
