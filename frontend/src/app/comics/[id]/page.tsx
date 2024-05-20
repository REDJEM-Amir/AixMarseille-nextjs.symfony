import ViewComic from "@/components/ViewComic";
import css from "@/styles/comicspage.module.css";

export default function Page({
    params
}: {
    params: { id: number }
}) {
    return (
        <div className={css.containerComics}>
            <ViewComic params={params} />
        </div>
    );
}