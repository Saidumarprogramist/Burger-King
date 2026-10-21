import useActiveSection from '../../hooks/useActiveSection'

export default function CategoryNav({ categories }) {
  const activeId = useActiveSection(categories.map(category => category.id))

  if (!categories.length) return null

  return (
    <nav
      aria-label='Категории меню'
      className='sticky top-16 z-30 -mx-4 bg-cream/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:top-24 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0 lg:backdrop-blur-none'
    >
      <ul className='no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible lg:rounded-3xl lg:bg-white lg:p-3 lg:shadow-sm'>
        {categories.map(category => {
          const isActive = category.id === activeId
          return (
            <li key={category.id} className='shrink-0'>
              <a
                href={`#${category.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold whitespace-nowrap transition lg:gap-3 lg:rounded-2xl lg:px-3 lg:py-2 lg:text-lg ${
                  isActive
                    ? 'bg-brown text-white lg:bg-cream lg:text-brown'
                    : 'bg-white text-brown hover:bg-cream-dark lg:bg-transparent'
                }`}
              >
                <span className='flex size-8 items-center justify-center rounded-xl bg-cream/70 lg:size-12'>
                  <img
                    src={category.icon}
                    alt=''
                    className='max-h-full max-w-full object-contain'
                  />
                </span>
                {category.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
