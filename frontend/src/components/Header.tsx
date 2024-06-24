import React from 'react'
import css from '@/styles/header.module.css'

const Header = () => {
    return (
        <div className={css.container}>
            <div className={css.contentTitle}>
                <div className={css.title}>Love Comics</div>
            </div>
        </div>
    )
}

export default Header