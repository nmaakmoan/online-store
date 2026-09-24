# Online Store

Учебный интернет-магазин на Django REST Framework + React + TypeScript + PostgreSQL + Docker.

## Возможности

- регистрация и вход;
- каталог товаров;
- категории;
- поиск;
- фильтрация по категории;
- сортировка по цене;
- страница товара;
- корзина в localStorage;
- изменение количества товаров;
- оформление заказа;
- история заказов;
- личный кабинет;
- Django Admin;
- REST API;
- Docker Compose.

## Стек

- Python
- Django
- Django REST Framework
- PostgreSQL
- React
- TypeScript
- Vite
- Axios
- Docker
- Git/GitHub

## Запуск

1. Скопируй `.env.example` в `.env`.
2. Запусти:

```bash
docker compose up --build
```

Frontend: http://localhost:5173  
Backend API: http://localhost:8000/api/  
Admin: http://localhost:8000/admin/

Для создания администратора:

```bash
docker compose exec backend python manage.py createsuperuser
```

## API

### Auth

- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `GET /api/auth/me/`

### Categories

- `GET /api/categories/`
- `POST /api/categories/`
- `GET /api/categories/<id>/`
- `PUT /api/categories/<id>/`
- `DELETE /api/categories/<id>/`

### Products

- `GET /api/products/`
- `POST /api/products/`
- `GET /api/products/<id>/`
- `PUT /api/products/<id>/`
- `DELETE /api/products/<id>/`

Поддерживаются query-параметры:

- `search`
- `category`
- `ordering=price` или `ordering=-price`

### Orders

- `GET /api/orders/`
- `POST /api/orders/`
- `GET /api/orders/<id>/`

## Корзина

Корзина хранится в `localStorage` браузера. При оформлении React отправляет товары на backend, где создаются `Order` и `OrderItem`.

## AI

В процессе разработки использовался ChatGPT для генерации отдельных участков кода, объяснения ошибок, рефакторинга и документации. AI-generated и AI-assisted код помечен непосредственно в исходных файлах.

## Screenshots

После запуска приложения можно добавить реальные скриншоты в `docs/screenshots/`.

## Автор

Учебный проект.
