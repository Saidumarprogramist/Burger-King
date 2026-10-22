import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import CategoryNav from './components/menu/CategoryNav'
import MenuSection from './components/menu/MenuSection'
import Footer from './components/footer/Footer'
import CartDrawer from './components/cart/CartDrawer'
import { MENU } from './constants/menu'
import { readCart, saveCart, changeQuantity, removeItem, cartDetails } from './utils/cart'

function filterMenu(query) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return MENU
  return MENU.map(category => ({
    ...category,
    items: category.items.filter(item => item.title.toLowerCase().includes(normalized)),
  })).filter(category => category.items.length > 0)
}
export default function App() {
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState(() => readCart(typeof window === 'undefined' ? null : window.localStorage))
  const [cartOpen, setCartOpen] = useState(false)
  const categories = useMemo(() => filterMenu(query), [query])
  const details = useMemo(() => cartDetails(cart), [cart])
  useEffect(() => { saveCart(window.localStorage, cart) }, [cart])
  const change = (id, delta) => setCart(current => changeQuantity(current, id, delta))
  return (
    <>
      <Navbar query={query} onQueryChange={setQuery} details={details} onOpenCart={() => setCartOpen(true)} />
      <main className='mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6 lg:px-8'>
        <Header />
        <div id='menu-top' className='mt-6 scroll-mt-16 lg:grid lg:grid-cols-[240px_1fr] lg:gap-8 lg:scroll-mt-24'>
          <aside className='contents lg:block'><CategoryNav categories={categories} /></aside>
          <div className='min-w-0'>
            {!query && <Hero />}
            {categories.length ? categories.map(category => (
              <MenuSection key={category.id} category={category} onAdd={id => change(id, 1)} />
            )) : (
              <div className='mt-12 rounded-3xl bg-white p-10 text-center'>
                <p className='text-xl font-semibold'>По запросу «{query}» ничего не найдено</p>
                <button type='button' onClick={() => setQuery('')} className='mt-5 rounded-full bg-flame px-6 py-2.5 font-semibold text-white'>Показать всё меню</button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} details={details} onChange={change}
        onRemove={id => setCart(current => removeItem(current, id))} onClear={() => setCart({})} />
    </>
  )
}
