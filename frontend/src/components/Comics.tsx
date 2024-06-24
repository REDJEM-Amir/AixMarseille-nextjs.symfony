'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import css from '@/styles/comics.module.css'
import Link from 'next/link';
import { LinearProgress } from '@mui/material';

type Comic = {
    id: number,
    title: string,
    picture: string,
    uploadDate: string
};

const Comics = () => {
    const [comics, setComics] = useState<Comic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/comics`);
            const { data } = response.data;
            setComics(data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={css.containerComics}>
            {loading ? (
                <LinearProgress />
            ) : (
                <div className={css.contentComics}>
                    {comics.length === 0 ? (
                        <p>Aucun comic n'est disponible pour le moment</p>
                    ) : (
                        comics.map(comic => (
                            <Link key={comic.id} className={css.link} href={`/comics/${comic.id}`}>
                                <div className={css.comics}>
                                    <img className={css.imgComics} src={`data:image/jpeg;base64,${comic.picture}`} alt={comic.title} />
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default Comics
