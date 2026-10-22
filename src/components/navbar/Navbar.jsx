import { useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { IoClose, IoSearch } from 'react-icons/io5'
import logo from '../../assets/Logo.svg'
import { formatPrice } from '../../utils/format'
import useDialog from '../../hooks/useDialog'

const LINKS = [{ label: 'Рестораны', href: '#footer' }, { label: 'Вакансии', href: 'https://burgerking.uz/vacancies' }]
function SearchField({ query, onQueryChange, className = '' }) {
  return <label className={`flex items-center gap-2 rounded-full bg-cream-dark px-4 py-2.5 focus-within:ring-2 focus-within:ring-flame ${className}`}>
    <IoSearch className='shrink-0 text-lg' aria-hidden='true' />
    <span className='sr-only'>Поиск по меню</span>
    <input type='search' value={query} onChange={event => onQueryChange(event.target.value)} placeholder='Поиск по меню'
      className='w-full min-w-0 bg-transparent text-base outline-none placeholder:text-brown-light' />
  </label>
}
function CartButton({ details, onClick }) {
  return <button type='button' onClick={onClick} aria-label={`Открыть корзину: ${details.count} товаров, ${formatPrice(details.total)}`}
    className='rounded-full border border-flame px-4 py-2 font-bold text-flame'>
    🛒 {details.count} · {formatPrice(details.total)}
  </button>
}
export default function Navbar({ query, onQueryChange, details, onOpenCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)
  const { containerRef, openerRef } = useDialog(isMenuOpen, closeMenu, '(min-width: 768px)')
  return <>
    <header className='sticky top-0 z-40 border-b border-cream-dark bg-cream/95 backdrop-blur'>
      <div className='mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 py-2 sm:px-6 lg:min-h-20 lg:px-8'>
        <a href='#' className='flex shrink-0 items-center gap-3' aria-label='Burger King — на главную'>
          <img src={logo} width={41} height={45} alt='' /><span className='hidden text-xl font-extrabold sm:inline'>Burger King</span>
        </a>
        <nav aria-label='Основная навигация' className='hidden md:block'><ul className='flex items-center gap-6 font-semibold'>
          {LINKS.map(link => <li key={link.label}><a href={link.href} className='text-brown-light hover:text-brown'>{link.label}</a></li>)}
        </ul></nav>
        <div className='ml-auto hidden items-center gap-3 md:flex'>
          <SearchField query={query} onQueryChange={onQueryChange} className='w-48 lg:w-64' />
          <CartButton details={details} onClick={onOpenCart} />
        </div>
        <div className='ml-auto flex items-center gap-2 md:hidden'>
          <CartButton details={details} onClick={onOpenCart} />
          <button ref={openerRef} type='button' onClick={() => setIsMenuOpen(true)} aria-label='Открыть меню'
            aria-expanded={isMenuOpen} aria-controls='mobile-menu' className='rounded-full border border-flame p-2 text-2xl text-flame'><BiMenu /></button>
        </div>
      </div>
    </header>
    {isMenuOpen && <div className='fixed inset-0 z-50 md:hidden' id='mobile-menu'>
      <div className='absolute inset-0 bg-brown/40' onClick={closeMenu} aria-hidden='true' />
      <div ref={containerRef} tabIndex={-1} role='dialog' aria-modal='true' aria-label='Мобильное меню'
        className='absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto rounded-b-3xl bg-white p-5 shadow-2xl'>
        <div className='flex items-center justify-between'>
          <img src={logo} width={41} height={45} alt='Burger King' />
          <button type='button' onClick={closeMenu} aria-label='Закрыть меню' className='rounded-full border border-flame p-2.5 text-2xl text-flame'><IoClose /></button>
        </div>
        <SearchField query={query} onQueryChange={onQueryChange} className='mt-5' />
        <ul className='mt-4 divide-y divide-cream-dark text-lg font-semibold'>
          {LINKS.map(link => <li key={link.label}><a href={link.href} onClick={closeMenu} className='block py-3'>{link.label}</a></li>)}
        </ul>
        <button type='button' onClick={() => { closeMenu(); if (query) document.getElementById('menu-top')?.scrollIntoView() }}
          className='mt-5 w-full rounded-full bg-brown py-3 font-semibold text-white'>
          {query ? 'Показать результаты' : 'Готово'}
        </button>
      </div>
    </div>}
  </>
}
