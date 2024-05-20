'use client'

import css from "@/styles/page.module.css"
import axios from "axios";
import { useEffect, useState } from "react";

type Comic = {
  id: number,
  title: string,
  picture: string,
  uploadDate: string
};

export default function Page() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const response = await axios.get('/api/comics')
    const { data, total, current_page, total_pages } = response.data;
    setComics(data);
    setTotal(total);
    setCurrentPage(current_page);
    setTotalPages(total_pages);
  }

  return (
    <div className={css.container}>
      {total === 0 ? (
        <div className={css.contentTextTotal}>
          <div className={css.textTotal}>Il n'y a aucun comics disponible pour le moment.</div>
        </div>
      ) : (
        <div className={css.content}>
          {comics.map(comic => (
            <div key={comic.id} className={css.card}>
              <img className={css.img} src={`data:image/jpeg;base64,${comic.picture}`} alt={comic.title} />
              <div className={css.title}>{comic.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
