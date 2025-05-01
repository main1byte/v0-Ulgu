FROM golang:1.21-alpine AS builder

WORKDIR /app

# Копирование файлов зависимостей
COPY go.mod go.sum ./

# Загрузка зависимостей
RUN go mod download

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Финальный образ
FROM alpine:latest

WORKDIR /app

# Установка необходимых пакетов
RUN apk --no-cache add ca-certificates tzdata

# Копирование бинарного файла из builder
COPY --from=builder /app/main .

# Переменные окружения по умолчанию
ENV PORT=8080

# Открытие порта
EXPOSE 8080

# Запуск приложения
CMD ["./main"]
