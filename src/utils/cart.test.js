import test from 'node:test'
import assert from 'node:assert/strict'
import { PRODUCTS, restoreCart, changeQuantity, removeItem, cartDetails, readCart, saveCart, CART_KEY } from './cart.js'

test('same legacy numeric IDs do not collide between categories', () => {
  assert.notEqual(PRODUCTS.get('combo-1').title, PRODUCTS.get('burgers-1').title)
  assert.equal(PRODUCTS.size, new Set(PRODUCTS.keys()).size)
})
test('adding twice and adjusting quantities', () => {
  let cart = changeQuantity({}, 'combo-1', 1)
  cart = changeQuantity(cart, 'combo-1', 1)
  cart = changeQuantity(cart, 'burgers-1', 1)
  assert.equal(cart['combo-1'], 2)
  assert.equal(cartDetails(cart).total, 72000 * 2 + 59000)
  cart = changeQuantity(cart, 'combo-1', -1)
  assert.equal(cartDetails(cart).count, 2)
  cart = removeItem(cart, 'burgers-1')
  assert.equal(cartDetails(cart).total, 72000)
  cart = changeQuantity(cart, 'combo-1', -1)
  assert.deepEqual(cart, {})
})
test('malformed, stale and invalid persisted entries are ignored', () => {
  assert.deepEqual(restoreCart('broken'), {})
  assert.deepEqual(restoreCart('{}'), {})
  assert.deepEqual(restoreCart(JSON.stringify([
    { id: 'combo-1', quantity: 2 }, { id: 'missing-1', quantity: 1 },
    { id: 'burgers-1', quantity: -3 }, { id: 'snacks-1', quantity: 2.5 },
    { id: 'combo-1', quantity: 99 }, { id: 'drinks-1', quantity: 100 },
  ])), { 'combo-1': 2 })
})
test('unavailable localStorage does not throw', () => {
  const denied = { getItem() { throw Error('denied') }, setItem() { throw Error('denied') } }
  assert.deepEqual(readCart(denied), {})
  assert.doesNotThrow(() => saveCart(denied, {}))
  const values = new Map()
  const storage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) }
  saveCart(storage, { 'combo-1': 3 })
  assert.equal(JSON.parse(values.get(CART_KEY))[0].quantity, 3)
  assert.deepEqual(readCart(storage), { 'combo-1': 3 })
})
test('quantity cannot exceed limit or go below zero', () => {
  assert.equal(changeQuantity({}, 'combo-1', 999)['combo-1'], 99)
  assert.deepEqual(changeQuantity({ 'combo-1': 1 }, 'combo-1', -4), {})
})
