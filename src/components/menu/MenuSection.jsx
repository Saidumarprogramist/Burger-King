import ProductCard from './ProductCard'

export default function MenuSection({ category, onAdd }) {
  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className='mt-12 scroll-mt-36 lg:scroll-mt-24'>
      <h2 id={`${category.id}-title`} className='flex items-baseline gap-3 text-3xl font-extrabold sm:text-4xl'>
        {category.title}<span className='text-base font-semibold text-brown-light'>{category.items.length}</span>
      </h2>
      <ul className='mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4'>
        {category.items.map(item => <li key={item.id}><ProductCard item={item} productId={`${category.id}-${item.id}`} onAdd={onAdd} /></li>)}
      </ul>
    </section>
  )
}
