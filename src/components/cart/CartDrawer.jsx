import { useState } from 'react'
import { formatPrice } from '../../utils/format'
import useDialog from '../../hooks/useDialog'

export default function CartDrawer({ open, onClose, details, onChange, onRemove, onClear }) {
  const [stage, setStage] = useState('cart')
  const { containerRef } = useDialog(open, onClose)
  const dismiss = () => { setStage('cart'); onClose() }
  const confirm = () => { onClear(); setStage('success') }
  if (!open) return null
  return (
    <div className='fixed inset-0 z-[60]' role='presentation'>
      <div className='absolute inset-0 bg-brown/60' onClick={dismiss} aria-hidden='true' />
      <section ref={containerRef} tabIndex={-1} role='dialog' aria-modal='true' aria-labelledby='cart-title'
        className='absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-cream shadow-2xl outline-none'>
        <div className='flex items-center justify-between border-b border-cream-dark p-5'>
          <h2 id='cart-title' className='text-2xl font-extrabold'>{stage === 'success' ? 'Готово!' : stage === 'review' ? 'Проверка заказа' : 'Корзина'}</h2>
          <button type='button' onClick={dismiss} aria-label='Закрыть корзину' className='rounded-full border border-brown px-4 py-2'>✕</button>
        </div>
        {stage === 'success' ? (
          <div className='flex flex-1 flex-col items-center justify-center gap-5 p-6 text-center' role='status'>
            <span className='text-6xl' aria-hidden='true'>✓</span>
            <p className='text-xl font-bold'>Демонстрационный заказ завершён!</p>
            <p>Это учебное приложение. Заказ не отправлен в ресторан и оплата не проводилась.</p>
            <button className='rounded-full bg-brown px-8 py-3 font-bold text-white' onClick={dismiss}>Вернуться в меню</button>
          </div>
        ) : (
          <>
            <div className='min-h-0 flex-1 overflow-y-auto p-5'>
              {details.lines.length === 0 ? (
                <div className='py-16 text-center'>
                  <p className='text-xl font-bold'>Корзина пока пуста</p>
                  <p className='mt-2 text-brown-light'>Выберите что-нибудь вкусное из меню.</p>
                  <button className='mt-6 rounded-full bg-brown px-6 py-3 text-white' onClick={dismiss}>Смотреть меню</button>
                </div>
              ) : (
                <ul className='space-y-4'>
                  {details.lines.map(item => <li key={item.id} className='rounded-2xl bg-white p-4'>
                    <div className='flex justify-between gap-3'><h3 className='font-bold'>{item.title}</h3><strong className='whitespace-nowrap'>{formatPrice(item.lineTotal)}</strong></div>
                    <div className='mt-3 flex flex-wrap items-center gap-3'>
                      {stage === 'cart' ? <>
                        <button aria-label={`Уменьшить количество: ${item.title}`} disabled={item.quantity <= 1} onClick={() => onChange(item.id, -1)} className='rounded-full border px-3 py-1 disabled:opacity-40'>−</button>
                        <span aria-label={`Количество: ${item.quantity}`} className='font-bold'>{item.quantity}</span>
                        <button aria-label={`Увеличить количество: ${item.title}`} disabled={item.quantity >= 99} onClick={() => onChange(item.id, 1)} className='rounded-full border px-3 py-1 disabled:opacity-40'>+</button>
                        <button onClick={() => onRemove(item.id)} className='ml-auto text-sm font-semibold underline'>Удалить</button>
                      </> : <span>Количество: {item.quantity} × {formatPrice(item.price)}</span>}
                    </div>
                  </li>)}
                </ul>
              )}
              {stage === 'review' && <p className='mt-5 rounded-2xl bg-white p-4 font-semibold'>Это только демонстрация. Ничего не отправляется в ресторан, реальные данные и оплата не требуются.</p>}
            </div>
            {details.lines.length > 0 && <div className='border-t border-cream-dark bg-cream p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]'>
              <div className='mb-4 flex items-center justify-between text-lg font-extrabold'><span>Итого · {details.count} шт.</span><span>{formatPrice(details.total)}</span></div>
              {stage === 'cart' ? <div className='flex gap-3'>
                <button className='rounded-full border border-brown px-5 py-3 font-bold' onClick={onClear}>Очистить</button>
                <button className='flex-1 rounded-full bg-brown px-4 py-3 font-bold text-white' onClick={() => setStage('review')}>Проверить заказ</button>
              </div> : <div className='flex gap-3'>
                <button className='rounded-full border border-brown px-5 py-3 font-bold' onClick={() => setStage('cart')}>Назад</button>
                <button className='flex-1 rounded-full bg-flame px-4 py-3 font-bold text-white' onClick={confirm}>Подтвердить демо-заказ</button>
              </div>}
            </div>}
          </>
        )}
      </section>
    </div>
  )
}
