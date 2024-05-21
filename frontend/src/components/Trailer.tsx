import React from 'react'
import css from '@/styles/trailer.module.css'

const Trailer = () => {
  return (
    <div className={css.containerTrailer}>
        <img className={css.imgTrailer} src="https://cdn.magicdecor.in/com/2023/10/26161101/Comic-Book-Wall-Makeover-1.jpg" alt="trailer" />
    </div>
  )
}

export default Trailer