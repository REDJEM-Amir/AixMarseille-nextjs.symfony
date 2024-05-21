'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import css from '@/styles/comics.module.css'
import Link from 'next/link';

type Comic = {
    id: number,
    title: string,
    picture: string,
    uploadDate: string
};

const Comics = ({
    title,
    type
}: {
    title: string,
    type: string
}) => {
    const [comics, setComics] = useState<Comic[]>([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const response = await axios.get(`/api/comics?type=${type}`)
        const { data } = response.data;
        setComics(data);
    }

    return (
        <div className={css.containerComics}>
            <div className={css.contentTItle}>
                <div className={css.title}>{title}</div>
            </div>
            <div className={css.contentComics}>
                {comics.map(comic => (
                    <Link className={css.link} href={`/comics/${comic.id}`}>
                        <div key={comic.id} className={css.comics}>
                            <img className={css.imgComics} src={`data:image/jpeg;base64,${comic.picture}`} alt={comic.title} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Comics