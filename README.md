# Лендинг для сайта по ремонту балконов

Проект состоит из двух частей:
1. Frontend - Next.js приложение с лендингом
2. Backend - Golang сервер на Fiber 3 для обработки форм и отправки email

## Frontend (Next.js)

### Требования
- Node.js 18+
- npm или yarn

### Установка и запуск

\`\`\`bash
# Установка зависимостей
npm install
# или
yarn install

# Запуск в режиме разработки
npm run dev
# или
yarn dev

# Сборка для продакшена
npm run build
# или
yarn build

# Запуск продакшен версии
npm start
# или
yarn start
\`\`\`

### Переменные окружения

Создайте файл `.env.local` в корне проекта и добавьте следующие переменные:

\`\`\`
BACKEND_URL=http://localhost:8080
\`\`\`

## Backend (Golang с Fiber 3)

### Требования
- Go 1.18+
- Docker (опционально)

### Установка и запуск

\`\`\`bash
# Установка зависимостей
go mod download

# Запуск сервера
go run main.go

# Сборка бинарного файла
go build -o server main.go

# Запуск собранного бинарного файла
./server
\`\`\`

### Переменные окружения

Создайте файл `.env` в корне проекта и добавьте следующие переменные:

\`\`\`
# Настройки SMTP сервера
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASSWORD=your_password

# Настройки email
FROM_EMAIL=noreply@balkonmaster.ru
TO_EMAIL=info@balkonmaster.ru

# Настройки сервера
PORT=8080
\`\`\`

### Запуск с Docker

\`\`\`bash
# Сборка Docker образа
docker build -t balkonmaster-backend .

# Запуск контейнера
docker run -p 8080:8080 --env-file .env balkonmaster-backend
\`\`\`

## API Endpoints

### POST /api/send-email

Отправляет email с данными формы.

**Тело запроса:**

\`\`\`json
{
  "name": "Имя пользователя",
  "phone": "+7 (123) 456-7890",
  "email": "user@example.com",
  "message": "Текст сообщения",
  "type": "contact" // "callback", "calculate" или "contact"
}
\`\`\`

**Ответ:**

\`\`\`json
{
  "success": true
}
\`\`\`

### GET /health

Проверка работоспособности сервера.

**Ответ:**

\`\`\`json
{
  "status": "ok"
}
\`\`\`

## Преимущества использования Fiber 3

1. **Высокая производительность** - Fiber построен на основе fasthttp, что делает его одним из самых быстрых веб-фреймворков для Go.

2. **Низкое потребление памяти** - Оптимизированная работа с памятью для обработки большого количества запросов.

3. **Простой API** - Интуитивно понятный API, похожий на Express.js, что упрощает разработку.

4. **Встроенные middleware** - Большой набор встроенных middleware для логирования, CORS, восстановления после паники и т.д.

5. **Масштабируемость** - Легко масштабируется для обработки большого количества запросов.
