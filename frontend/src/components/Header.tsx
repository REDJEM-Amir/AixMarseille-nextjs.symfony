import React from 'react'
import css from '@/styles/header.module.css'
import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';

const Header = async () => {
    const session = await getSession();
    if (!session) {
        return (
            <div className={css.container}>
                <div className={css.contentTitle}>
                    <div className={css.title}>Love Comics</div>
                </div>
                <a href="/api/auth/login" className={css.contentLogin}>
                    <div className={css.textLogin}>Connectez-vous</div>
                </a>
            </div>
        )
    } else {
        return (
            <div className={css.container}>
                <div className={css.contentTitle}>
                    <div className={css.title}>Love Comics</div>
                </div>
                <div className={css.contentAccess}>
                    <Link href="/security" className={css.contentLogin}>
                        <div className={css.textLogin}>Ajouter des comics</div>
                    </Link>
                    <a href="/api/auth/logout" className={css.contentLogin}>
                        <div className={css.textLogin}>Déconnectez-vous</div>
                    </a>
                </div>
            </div>
        )
    }
}

export default Header