import { MENU } from '../constants/menu.js'

export const CART_KEY = 'burger-king-demo-cart-v1'
export const MAX_QUANTITY = 99
export const PRODUCTS = new Map(MENU.flatMap(category =>
  category.items.map(item => [`${category.id}-${item.id}`, { ...item, id: `${category.id}-${item.id}` }])
))

export function restoreCart(raw) {
  if (!raw) return {}
  try {
    const entries = JSON.parse(raw)
    if (!Array.isArray(entries)) return {}
    return entries.reduce((cart, entry) => {
      if (!entry || typeof entry.id !== 'string' || !PRODUCTS.has(entry.id) ||
          !Number.isSafeInteger(entry.quantity) || entry.quantity < 1 ||
          entry.quantity > MAX_QUANTITY || Object.hasOwn(cart, entry.id)) return cart
      cart[entry.id] = entry.quantity
      return cart
    }, {})
  } catch {
    return {}
  }
}

export function readCart(storage) {
  try { return restoreCart(storage?.getItem(CART_KEY)) } catch { return {} }
}

export function saveCart(storage, cart) {
  try {
    storage?.setItem(CART_KEY, JSON.stringify(Object.entries(cart).map(([id, quantity]) => ({ id, quantity }))))
  } catch { /* Storage can be disabled, full, or inaccessible. */ }
}

export function changeQuantity(cart, id, delta) {
  if (!PRODUCTS.has(id) || !Number.isSafeInteger(delta)) return cart
  const quantity = Math.min(MAX_QUANTITY, Math.max(0, (cart[id] || 0) + delta))
  const next = { ...cart }
  if (quantity === 0) delete next[id]
  else next[id] = quantity
  return next
}

export function removeItem(cart, id) {
  const next = { ...cart }
  delete next[id]
  return next
}

export function cartDetails(cart) {
  const lines = Object.entries(cart).flatMap(([id, quantity]) => {
    const product = PRODUCTS.get(id)
    return product && Number.isSafeInteger(quantity) && quantity > 0 && quantity <= MAX_QUANTITY
      ? [{ ...product, quantity, lineTotal: product.price * quantity }] : []
  })
  return {
    lines,
    count: lines.reduce((sum, item) => sum + item.quantity, 0),
    total: lines.reduce((sum, item) => sum + item.lineTotal, 0),
  }
}
