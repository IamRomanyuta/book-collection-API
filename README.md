<<<<<<< HEAD
# book-collection-API
=======
# Book Collection API

Book Collection API - это RESTful API для управления коллекцией книг с расширенными функциями. API позволяет пользователям добавлять книги, просматривать список книг, обновлять информацию о книгах и удалять книги. Кроме того, API имеет функции для управления пользователями и их ролями с использованием битовых масок.

## Оглавление

- [Функциональные возможности](#функциональные-возможности)
- [Технологический стек](#технологический-стек)
- [Установка и запуск](#установка-и-запуск)
- [Эндпоинты API](#эндпоинты-api)
- [Структура проекта](#структура-проекта)

## Функциональные возможности

1. **Добавление книги** - позволяет добавлять новую книгу (только для администраторов).
2. **Получение списка книг** - возвращает список всех книг.
3. **Получение книги по ID** - возвращает данные книги по её ID.
4. **Обновление информации о книге** - позволяет обновить информацию о книге (только для администраторов).
5. **Удаление книги** - позволяет удалить книгу (только для администраторов).
6. **Регистрация пользователя** - позволяет зарегистрировать нового пользователя.
7. **Аутентификация пользователя** - позволяет пользователю войти в систему и получить JWT токен.
8. **Получение информации о текущем пользователе** - возвращает данные о текущем аутентифицированном пользователе.
9. **Изменение роли пользователя** - позволяет изменить роль пользователя (только для администраторов).

## Технологический стек

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT (JSON Web Token)
- Docker

## Установка и запуск

### Предварительные требования

Убедитесь, что на вашем компьютере установлены следующие программы:

- Docker
- Docker Compose

### Инструкции по запуску

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/ваш-пользователь/book-collection-api.git
   cd book-collection-api
   ```
### .env   
1. **Создайте .env файл**
    ```bash
    DATABASE_URL="postgresql://postgres:postgres@db:5432/book_collection"
    JWT_SECRET="ваш_сгенерированный_секретный_ключ"
    ```
### Docker
Запустите контейнеры Docker:
```
docker-compose up -d --build
```
### Выполните миграции Prisma:
```
docker-compose exec app npx prisma migrate dev --name init
docker-compose exec app npx prisma generate
```
### Установите типы для bcryptjs:
```
docker-compose exec app npm install --save-dev @types/bcryptjs
```

### Запустите скрипт для добавления начальных данных:

```
docker-compose exec app npm run seed
```

### API должно быть доступно по адресу http://localhost:3000.

## Эндпоинты API

### 1. Добавление книги

- **URL:** `/books`
- **Метод:** `POST`
- **Тело запроса:**

  ```json
  {
    "title": "Название книги",
    "author": "Автор",
    "publicationDate": "2023-01-01",
    "genres": ["Жанр1", "Жанр2"]
  }
  ```
### Ответ:
  ```json
      {
      "id": 1,
      "title": "Название книги",
      "author": "Автор",
      "publicationDate": "2023-01-01T00:00:00.000Z",
      "genres": ["Жанр1", "Жанр2"],
      "createdById": 1
      }
  ```
 ### Аутентификация: Требуется (роль "администратор")

## 2. Получение списка книг


- **URL:** `/books`
- **Метод:** `GET`
- **Тело запроса:**
URL: /books

### Ответ:

```json
[
  {
    "id": 1,
    "title": "Название книги",
    "author": "Автор",
    "publicationDate": "2023-01-01T00:00:00.000Z",
    "genres": ["Жанр1", "Жанр2"],
    "createdById": 1
  }
]
```
### 3. Получение книги по ID
- **URL:** `/books/:id`
- **Метод:** `GET`
### Ответ:

```json
{
  "id": 1,
  "title": "Название книги",
  "author": "Автор",
  "publicationDate": "2023-01-01T00:00:00.000Z",
  "genres": ["Жанр1", "Жанр2"],
  "createdById": 1
}
```
### 4. Обновление информации о книге
- **URL:** `/books/:id`
- **Метод:** `PUT`

### Тело запроса:

```json
{
  "title": "Новое название книги",
  "author": "Новый автор",
  "publicationDate": "2023-01-01",
  "genres": ["Жанр1", "Жанр2"]
}
```

### Ответ:

```json
{
  "id": 1,
  "title": "Новое название книги",
  "author": "Новый автор",
  "publicationDate": "2023-01-01T00:00:00.000Z",
  "genres": ["Жанр1", "Жанр2"],
  "createdById": 1
}
```
### Аутентификация: Требуется (роль "администратор")

### 5. Удаление книги
- **URL:** `/books/:id`
- **Метод:** `DELETE`

### Аутентификация: Требуется (роль "администратор")

### 6. Регистрация пользователя

- **URL:** `/users/register`
- **Метод:** `POST`
- **Тело запроса:**

```json
{
  "username": "пользователь",
  "email": "email@example.com",
  "password": "пароль"
}
```

### Ответ:

```json
{
  "id": 1,
  "username": "пользователь",
  "email": "email@example.com",
  "role": 0
}
```

### 7. Аутентификация пользователя
- **URL:** `/users/login`
- **Метод:** `POST`
- **Тело запроса:**

```json
{
  "username": "пользователь",
  "password": "пароль"
}
```

### Ответ:

```json
{
  "token": "ваш_jwt_токен"
}
```

### 8. Получение информации о текущем пользователе
- **URL:** `/users/me`
- **Метод:** `GET`

### Ответ:

```json
{
  "id": 1,
  "username": "пользователь",
  "email": "email@example.com",
  "role": 0
}
```
### Аутентификация: Требуется

### 9. Изменение роли пользователя
- **URL:** `/users/:id/role`
- **Метод:** `PUT`
- **Тело запроса:**

```json
Копировать код
{
  "role": 1
}
```
### Ответ:

```json
{
  "id": 1,
  "username": "пользователь",
  "email": "email@example.com",
  "role": 1
}
```
### Аутентификация: Требуется (роль "администратор")

## Структура проекта

```book-collection-api/
├── src/
│   ├── controllers/
│   │   ├── bookController.ts
│   │   ├── userController.ts
│   ├── interfaces/
│   │   ├── CustomRequest.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   ├── routes/
│   │   ├── bookRoutes.ts
│   │   ├── userRoutes.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── bookService.ts
│   │   ├── userService.ts
│   ├── prisma.ts
│   ├── app.ts
│   ├── server.ts
├── prisma/
│   ├── schema.prisma
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── .env
```

### Описание файлов и папок

- **`src/controllers/`**: Содержит контроллеры для обработки логики запросов.
  - **`bookController.ts`**: Обрабатывает запросы, связанные с книгами (добавление, получение списка, получение по ID, обновление, удаление).
  - **`userController.ts`**: Обрабатывает запросы, связанные с пользователями (регистрация, вход, получение текущего пользователя, изменение роли).
- **`src/interfaces/`**: Содержит интерфейсы TypeScript.
  - **`CustomRequest.ts`**: Интерфейс для расширенного запроса с пользователем.
- **`src/middlewares/`**: Содержит middleware для аутентификации.
  - **`authMiddleware.ts`**: Middleware для проверки JWT токенов и аутентификации пользователей.
- **`src/routes/`**: Содержит определения маршрутов.
  - **`bookRoutes.ts`**: Маршруты для работы с книгами.
  - **`userRoutes.ts`**: Маршруты для работы с пользователями.
- **`src/services/`**: Содержит бизнес-логику приложения.
  - **`authService.ts`**: Логика для регистрации и аутентификации пользователей.
  - **`bookService.ts`**: Логика для работы с книгами.
  - **`userService.ts`**: Логика для работы с пользователями и их ролями.
- **`src/prisma.ts`**: Инициализация клиента Prisma.
- **`src/app.ts`**: Инициализация Express приложения.
- **`src/server.ts`**: Запуск сервера.
- **`prisma/schema.prisma`**: Схема базы данных Prisma.
- **`Dockerfile`**: Описание Docker-образа для приложения.
- **`docker-compose.yml`**: Описание Docker-сервисов.
- **`package.json`**: Зависимости и скрипты для проекта.
- **`tsconfig.json`**: Конфигурация TypeScript.
- **`.env`**: Переменные окружения для проекта.
>>>>>>> c476489 (Initial commit)
