'use client'

import React from 'react'
import css from '@/styles/header.module.css'
import Link from 'next/link';
import { getSession } from '@auth0/nextjs-auth0';

const Header = async () => {
    const session = await getSession();
    return (
        <div className={css.container}>
            <div className={css.content}>
                <input className={css.search} placeholder='Chercher votre comics'></input>
            </div>
            <div className={css.contentTitle}>
                <div className={css.title}>Love Comics</div>
            </div>
            {session ? (
                <div className={css.contentSession}>
                    <Link className={css.link} href="/api/auth/logout">
                        <div className={css.contentLogout}>
                            <div className={css.logout}>Disconnect</div>
                        </div>
                    </Link>
                </div>
            ) : (
                <div className={css.contentNotSession}>
                    <Link className={css.link} href="/api/auth/login">
                        <div className={css.contentLogin}>
                            <div className={css.login}>LOGIN</div>
                        </div>
                    </Link>
                    <Link className={css.link} href="/api/auth/signup">
                        <div className={css.contentRegister}>
                            <div className={css.register}>REGISTER</div>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Header