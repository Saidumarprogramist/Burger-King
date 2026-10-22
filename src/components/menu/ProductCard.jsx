import { useState } from 'react'
import { formatPrice } from '../../utils/format'

export default function ProductCard({ item, productId, onAdd }) {
  const [imageError, setImageError] = useState(false)
  return (
    <article className='group flex h-full flex-col rounded-3xl bg-white/80 p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl sm:p-5'>
      <div className='flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-cream-dark'>
        {imageError ? <span className='px-3 text-center text-sm text-brown-light' role='img' aria-label='Изображение недоступно'>🍔<span className='block'>Нет изображения</span></span> :
          <img src={item.image} alt={item.title} loading='lazy' decoding='async' onError={() => setImageError(true)}
            className='h-full w-full object-contain transition duration-300 group-hover:scale-105' />}
      </div>
      <h3 className='mt-3 line-clamp-2 text-base leading-tight font-bold sm:text-lg'>{item.title}</h3>
      <p className='mt-2 mb-3 text-lg font-extrabold text-flame sm:text-xl'>{formatPrice(item.price)}</p>
      <button type='button' onClick={() => onAdd(productId)} aria-label={`Добавить в корзину: ${item.title}`}
        className='mt-auto w-full rounded-full bg-brown px-4 py-2 text-sm font-semibold text-white hover:bg-flame sm:text-base'>Добавить</button>
    </article>
  )
}
