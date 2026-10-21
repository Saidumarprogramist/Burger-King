import { IoTimeOutline, IoStorefrontOutline } from 'react-icons/io5'
import heroBackground from '../../assets/Hero/hero-background.png'

export default function Hero() {
  return (
    <section aria-label='Главный баннер' className='mt-6 lg:mt-0'>
      <div className='grid grid-cols-2 gap-3 sm:gap-5'>
        <p className='flex items-center justify-center gap-2 rounded-3xl bg-brown px-3 py-3 text-center text-base font-semibold text-white sm:text-xl'>
          <IoTimeOutline className='shrink-0 text-xl sm:text-2xl' aria-hidden />
          Скоро запуск
        </p>
        <p className='flex items-center justify-center gap-2 rounded-3xl bg-white px-3 py-3 text-center text-base font-semibold sm:text-xl'>
          <IoStorefrontOutline className='shrink-0 text-xl sm:text-2xl' aria-hidden />
          Только самовывоз
        </p>
      </div>
      <img
        src={heroBackground}
        alt='O‘zbekiston, tayyor tur! Nihoyat biz shu yerdamiz'
        width={2048}
        height={708}
        className='mt-5 w-full rounded-3xl shadow-sm'
      />
    </section>
  )
}
