# Burger King — меню

Одностраничный сайт-меню Burger King Узбекистан на React 19 + Vite + Tailwind CSS 4.

## Запуск

```bash
npm install
npm run dev      # dev-сервер на http://localhost:5173
npm run build    # продакшен-сборка в dist/
npm run lint     # ESLint
```

## Структура

- `src/constants/menu.js` — категории и позиции меню (название, цена, картинка).
- `src/constants/data.js` — промо-баннеры.
- `src/components/menu/` — навигация по категориям, секция категории и карточка товара.
- `src/components/navbar`, `header`, `hero`, `footer` — шапка, баннеры и подвал.

Чтобы добавить товар или категорию, достаточно изменить `src/constants/menu.js`.
