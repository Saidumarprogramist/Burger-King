import { useEffect, useRef, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { IoClose, IoSearch } from 'react-icons/io5'
import logo from '../../assets/Logo.svg'
import wallet from '../../assets/Valute.svg'

const LINKS = [
  { label: 'Рестораны', href: '#footer' },
  { label: 'Вакансии', href: 'https://burgerking.uz/vacancies' },
]

function SearchField({ query, onQueryChange, inputRef, className = '' }) {
  return (
    <label
      className={`flex items-center gap-2 rounded-full bg-cream-dark px-4 py-2.5 focus-within:ring-2 focus-within:ring-flame ${className}`}
    >
      <IoSearch className='shrink-0 text-lg' aria-hidden />
      <span className='sr-only'>Поиск по меню</span>
      <input
        ref={inputRef}
        type='search'
        value={query}
        onChange={event => onQueryChange(event.target.value)}
        placeholder='Поиск по меню'
        className='w-full min-w-0 bg-transparent text-base outline-none placeholder:text-brown-light focus-visible:outline-none'
      />
    </label>
  )
}

function CartBadge({ className = '' }) {
  return (
    <span
      className={`flex items-center gap-2 rounded-full border border-flame px-4 py-2 font-bold whitespace-nowrap text-flame ${className}`}
      aria-label='Корзина: 0 UZS'
    >
      <img src={wallet} width={14} height={18} alt='' />0 UZS
    </span>
  )
}

export default function Navbar({ query, onQueryChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const mobileSearchRef = useRef(null)

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = event => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    mobileSearchRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const showResults = () => {
    closeMenu()
    if (query) document.getElementById('menu-top')?.scrollIntoView()
  }

  return (
    <>
      <header className='sticky top-0 z-40 border-b border-cream-dark bg-cream/90 backdrop-blur'>
        <div className='mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-20 lg:px-8'>
          <a
            href='#'
            className='flex shrink-0 items-center gap-3'
            aria-label='Burger King — на главную'
          >
            <img src={logo} width={41} height={45} alt='' />
            <span className='hidden text-xl font-extrabold sm:inline'>
              Burger King
            </span>
          </a>

          <nav aria-label='Основная навигация' className='hidden md:block'>
            <ul className='flex items-center gap-6 font-semibold'>
              {LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className='text-brown-light transition hover:text-brown'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className='ml-auto hidden items-center gap-3 md:flex'>
            <SearchField
              query={query}
              onQueryChange={onQueryChange}
              className='w-56 lg:w-72'
            />
            <span className='rounded-full bg-flame px-3 py-2 text-sm font-bold text-white'>
              RU
            </span>
            <CartBadge />
          </div>

          <button
            type='button'
            onClick={() => setIsMenuOpen(true)}
            aria-label='Открыть меню'
            aria-expanded={isMenuOpen}
            aria-controls='mobile-menu'
            className='ml-auto rounded-full border border-flame p-2.5 text-2xl text-flame md:hidden'
          >
            <BiMenu />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className='fixed inset-0 z-50 md:hidden'
          id='mobile-menu'
          role='dialog'
          aria-modal='true'
          aria-label='Меню'
        >
          <div
            className='absolute inset-0 bg-brown/40'
            onClick={closeMenu}
            aria-hidden
          />
          <div className='absolute inset-x-0 top-0 rounded-b-3xl bg-white p-5 shadow-2xl'>
            <div className='flex items-center justify-between'>
              <img src={logo} width={41} height={45} alt='Burger King' />
              <button
                type='button'
                onClick={closeMenu}
                aria-label='Закрыть меню'
                className='rounded-full border border-flame p-2.5 text-2xl text-flame'
              >
                <IoClose />
              </button>
            </div>
            <SearchField
              query={query}
              onQueryChange={onQueryChange}
              inputRef={mobileSearchRef}
              className='mt-5'
            />
            <ul className='mt-4 divide-y divide-cream-dark text-lg font-semibold'>
              {LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className='block py-3'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className='mt-4 flex items-center justify-between gap-3'>
              <span className='rounded-full bg-flame px-4 py-2 font-bold text-white'>
                RU
              </span>
              <CartBadge />
            </div>
            <button
              type='button'
              onClick={showResults}
              className='mt-5 w-full rounded-full bg-brown py-3 font-semibold text-white'
            >
              {query ? 'Показать результаты' : 'Готово'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
