import logo from '../../assets/Logo.svg'

const SITE = 'https://burgerking.uz'

const LINK_GROUPS = [
  [
    { label: 'Вакансии', href: `${SITE}/vacancies` },
    { label: 'Сертификат Халяль', href: `${SITE}/${encodeURIComponent('Халяль')}.pdf` },
  ],
  [
    { label: 'Публичная оферта', href: `${SITE}/offer_v2.pdf` },
    { label: 'Политика конфиденциальности', href: `${SITE}/privacy` },
  ],
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id='footer' className='bg-white/70'>
      <div className='mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[2fr_1fr_1fr] lg:px-8 lg:py-16'>
        <div>
          <div className='flex items-center gap-3'>
            <img src={logo} width={41} height={45} alt='' />
            <p className='text-2xl font-extrabold'>Burger King</p>
          </div>
          <address className='mt-4 text-sm leading-relaxed text-brown-light not-italic'>
            ИП ООО «FAST FOOD SYSTEMS»
            <br />
            Юридический адрес: г. Ташкент, Яккасарайский район, ул. Бобура, 74.
          </address>
        </div>
        {LINK_GROUPS.map((group, index) => (
          <ul key={index} className='space-y-3 font-semibold'>
            {group.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='transition hover:text-flame'
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className='border-t border-cream-dark'>
        <p className='mx-auto max-w-7xl px-4 py-5 text-xs text-brown-light sm:px-6 lg:px-8'>
          TM & © {year} Burger King Corporation. Все права защищены.
        </p>
      </div>
    </footer>
  )
}
