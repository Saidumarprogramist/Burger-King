import { PROMO_BANNERS } from '../../constants/data'

export default function Header() {
  return (
    <section aria-label='Акции' className='-mx-4 sm:mx-0'>
      <ul className='no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:px-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible'>
        {PROMO_BANNERS.map(banner => (
          <li
            key={banner.id}
            className='w-[42%] shrink-0 snap-start sm:w-[28%] lg:w-auto'
          >
            <img
              src={banner.image}
              alt={banner.alt}
              width={492}
              height={640}
              className='aspect-[492/640] w-full rounded-3xl object-cover shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg'
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
