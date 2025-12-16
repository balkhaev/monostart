# monostart

Современный TypeScript стартер для монорепозиториев на базе Next.js, Hono и других передовых технологий.

## Возможности

- **TypeScript** — типобезопасность и улучшенный DX
- **Next.js** — полнофункциональный React-фреймворк
- **TailwindCSS** — утилитарный CSS для быстрой разработки UI
- **shadcn/ui** — переиспользуемые UI-компоненты
- **Hono** — лёгкий и производительный серверный фреймворк
- **Bun** — современный рантайм
- **Drizzle** — TypeScript-first ORM
- **PostgreSQL** — база данных
- **Better-Auth** — аутентификация
- **Turborepo** — оптимизированная система сборки для монорепозиториев
- **Biome** — линтинг и форматирование
- **Husky** — git-хуки для контроля качества кода

## Быстрый старт

Установка зависимостей:

```bash
bun install
```

## Настройка базы данных

Проект использует PostgreSQL с Drizzle ORM.

1. Убедитесь, что у вас настроена PostgreSQL.
2. Обновите файл `apps/server/.env` с данными подключения.

3. Примените схему к базе данных:

```bash
bun run db:push
```

Запуск в режиме разработки:

```bash
bun run dev
```

Откройте [http://localhost:3001](http://localhost:3001) для просмотра веб-приложения.
API доступен по адресу [http://localhost:3000](http://localhost:3000).

## Структура проекта

```
monostart/
├── apps/
│   ├── web/         # Фронтенд (Next.js)
│   └── server/      # Бэкенд API (Hono)
├── packages/
│   ├── auth/        # Конфигурация и логика аутентификации
│   ├── config/      # Общие конфигурации (tsconfig и т.д.)
│   ├── db/          # Схема базы данных и запросы
│   └── ui/          # Переиспользуемые UI-компоненты
```

## Доступные скрипты

- `bun run dev` — запуск всех приложений в режиме разработки
- `bun run build` — сборка всех приложений
- `bun run dev:web` — запуск только веб-приложения
- `bun run dev:server` — запуск только сервера
- `bun run check-types` — проверка TypeScript типов
- `bun run check` — запустить Biome (форматирование и линтинг)

### Работа с базой данных

- `bun run db:push` — применить изменения схемы к БД (без миграций, для разработки)
- `bun run db:generate` — сгенерировать SQL-миграции из изменений схемы
- `bun run db:migrate` — применить миграции к базе данных
- `bun run db:studio` — открыть Drizzle Studio
- `bun run db:start` — запустить PostgreSQL в Docker
- `bun run db:stop` — остановить PostgreSQL
- `bun run db:down` — удалить контейнер PostgreSQL

### Workflow миграций

1. Внесите изменения в схему (`packages/db/src/schema/`)
2. Сгенерируйте миграцию: `bun run db:generate`
3. Примените миграцию: `bun run db:migrate`

#### Миграции в Docker

При запуске контейнера сервера можно автоматически выполнить миграции, установив переменную окружения:

```bash
docker run -e RUN_MIGRATIONS=true -e DATABASE_URL=... server
```
