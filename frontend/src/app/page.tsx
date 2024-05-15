import css from "@/styles/page.module.css"

const comics = [
  {
    id: 1,
    title: "The Amazing Spider-Man",
    image: "https://img.buzzfeed.com/buzzfeed-static/static/2022-03/30/23/asset/c14c01274175/sub-buzz-532-1648681737-1.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto"
  },
  {
    id: 2,
    title: "Iron Man",
    image: "https://img.buzzfeed.com/buzzfeed-static/static/2022-03/30/23/asset/368eba18407b/sub-buzz-516-1648681764-2.jpg?crop=896:1400;66,78&downsize=600:*&output-format=auto&output-quality=auto"
  },
  {
    id: 3,
    title: "Batman: The Killing Joke",
    image: "https://img.buzzfeed.com/buzzfeed-static/static/2022-03/25/15/asset/86456cf1bf79/sub-buzz-2096-1648221053-20.jpg?crop=638:948;639,66&downsize=600:*&output-format=auto&output-quality=auto"
  },
  {
    id: 4,
    title: "Captain America",
    image: "https://img.buzzfeed.com/buzzfeed-static/static/2022-03/30/23/asset/368eba18407b/sub-buzz-527-1648681790-7.jpg?crop=896:1243;66,98&downsize=600:*&output-format=auto&output-quality=auto"
  },
  {
    id: 5,
    title: "Action Comics",
    image: "https://img.buzzfeed.com/buzzfeed-static/static/2022-03/24/21/asset/fcf0aaaff603/sub-buzz-741-1648159131-1.jpg?crop=683:1035;734,0&downsize=600:*&output-format=auto&output-quality=auto"
  },
];

export default function Page() {
  return (
    <div className={css.container}>
      <div className={css.content}>
        {comics.map(comic => (
          <div key={comic.id} className={css.card}>
            <img className={css.img} src={comic.image} alt={comic.title} />
            <div className={css.title}>{comic.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
