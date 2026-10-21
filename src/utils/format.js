const priceFormatter = new Intl.NumberFormat('ru-RU')

export function formatPrice(value) {
  return `${priceFormatter.format(value)} UZS`
}
