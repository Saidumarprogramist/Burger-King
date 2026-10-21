import { formatPrice } from '../../utils/format'

export default function ProductCard({ item }) {
  return (
    <article className='group flex h-full flex-col rounded-3xl bg-white/80 p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl sm:p-5'>
      <div className='flex aspect-square items-center justify-center overflow-hidden rounded-2xl'>
        <img
          src={item.image}
          alt={item.title}
          loading='lazy'
          decoding='async'
          className='h-full w-full object-contain transition duration-300 group-hover:scale-105'
        />
      </div>
      <h3 className='mt-3 line-clamp-2 text-base leading-tight font-bold sm:text-lg'>
        {item.title}
      </h3>
      <p className='mt-2 mb-3 text-lg font-extrabold text-flame sm:text-xl'>
        {formatPrice(item.price)}
      </p>
      <button
        type='button'
        disabled
        className='mt-auto w-full cursor-not-allowed rounded-full bg-cream-dark px-4 py-2 text-sm font-semibold text-brown-light sm:text-base'
      >
        Скоро запуск
      </button>
    </article>
  )
}
