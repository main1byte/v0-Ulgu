package main

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/adaptor"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/gofiber/fiber/v3/middleware/recover"
	"gopkg.in/gomail.v2"
)

// EmailRequest представляет структуру данных для запроса на отправку email
type EmailRequest struct {
	To      string `json:"to"`
	Subject string `json:"subject"`
	Name    string `json:"name"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
	Message string `json:"message"`
	Type    string `json:"type"`
}

// Конфигурация для отправки email
type EmailConfig struct {
	SMTPHost     string
	SMTPPort     int
	SMTPUser     string
	SMTPPassword string
	FromEmail    string
	ToEmail      string
}

// Шаблоны email
var templates map[string]*template.Template

// Инициализация шаблонов
func initTemplates() error {
	templates = make(map[string]*template.Template)
	
	// Список шаблонов для загрузки
	templateFiles := []string{
		"email_callback.html",
		"email_calculate.html",
		"email_contact.html",
	}
	
	// Загрузка каждого шаблона
	for _, file := range templateFiles {
		tmpl, err := template.ParseFiles(filepath.Join("templates", file))
		if err != nil {
			return fmt.Errorf("ошибка при загрузке шаблона %s: %v", file, err)
		}
		templates[file] = tmpl
	}
	
	return nil
}

// Получение конфигурации из переменных окружения
func getEmailConfig() EmailConfig {
	return EmailConfig{
		SMTPHost:     getEnv("SMTP_HOST", "smtp.example.com"),
		SMTPPort:     getEnvAsInt("SMTP_PORT", 587),
		SMTPUser:     getEnv("SMTP_USER", "user"),
		SMTPPassword: getEnv("SMTP_PASSWORD", "password"),
		FromEmail:    getEnv("FROM_EMAIL", "noreply@balkonmaster.ru"),
		ToEmail:      getEnv("TO_EMAIL", "info@balkonmaster.ru"),
	}
}

// Получение значения переменной окружения с значением по умолчанию
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

// Получение числового значения переменной окружения
func getEnvAsInt(key string, defaultValue int) int {
	valueStr := os.Getenv(key)
	if valueStr == "" {
		return defaultValue
	}

	value, err := strconv.Atoi(valueStr)
	if err != nil {
		log.Printf("Ошибка при преобразовании %s в число: %v. Используется значение по умолчанию: %d", key, err, defaultValue)
		return defaultValue
	}

	return value
}

// Обработчик для отправки email (стандартный HTTP обработчик)
func sendEmailHandler(w http.ResponseWriter, r *http.Request) {
	// Проверка метода запроса
	if r.Method != http.MethodPost {
		http.Error(w, "Метод не поддерживается", http.StatusMethodNotAllowed)
		return
	}

	// Декодирование JSON запроса
	var req EmailRequest
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&req); err != nil {
		http.Error(w, "Ошибка при разборе JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	// Проверка обязательных полей
	if req.Name == "" || req.Phone == "" {
		http.Error(w, "Имя и телефон обязательны для заполнения", http.StatusBadRequest)
		return
	}

	// Получение конфигурации email
	config := getEmailConfig()

	// Если адрес получателя не указан в запросе, используем значение из конфигурации
	if req.To == "" {
		req.To = config.ToEmail
	}

	// Формируем тему письма, если она не указана
	if req.Subject == "" {
		switch req.Type {
		case "callback":
			req.Subject = "Заявка на обратный звонок"
		case "calculate":
			req.Subject = "Заявка на расчет стоимости"
		case "contact":
			req.Subject = "Сообщение с сайта"
		default:
			req.Subject = "Новая заявка с сайта"
		}
	}

	// Выбор шаблона в зависимости от типа формы
	var templateFile string
	switch req.Type {
	case "callback":
		templateFile = "email_callback.html"
	case "calculate":
		templateFile = "email_calculate.html"
	case "contact":
		templateFile = "email_contact.html"
	default:
		templateFile = "email_contact.html"
	}

	// Получение шаблона
	tmpl, ok := templates[templateFile]
	if !ok {
		http.Error(w, "Шаблон не найден", http.StatusInternalServerError)
		return
	}

	// Рендеринг шаблона
	var body bytes.Buffer
	if err := tmpl.Execute(&body, req); err != nil {
		http.Error(w, "Ошибка при рендеринге шаблона: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Настройка отправки email
	m := gomail.NewMessage()
	m.SetHeader("From", config.FromEmail)
	m.SetHeader("To", req.To)
	m.SetHeader("Subject", req.Subject)
	m.SetBody("text/html", body.String())

	// Настройки SMTP сервера
	d := gomail.NewDialer(config.SMTPHost, config.SMTPPort, config.SMTPUser, config.SMTPPassword)

	// Отправка email
	if err := d.DialAndSend(m); err != nil {
		log.Println("Ошибка отправки email:", err)
		http.Error(w, "Ошибка отправки email: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Логирование успешной отправки
	log.Printf("Email успешно отправлен: %s - %s", req.Subject, req.Name)

	// Отправка успешного ответа
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"success": true}`))
}

// Обработчик для проверки работоспособности сервера (стандартный HTTP обработчик)
func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "ok"}`))
}

func main() {
	// Инициализация шаблонов
	if err := initTemplates(); err != nil {
		log.Fatalf("Ошибка при инициализации шаблонов: %v", err)
	}

	// Создание нового Fiber приложения
	app := fiber.New(fiber.Config{
		AppName:      "БалконМастер API",
		ErrorHandler: customErrorHandler,
	})

	// Middleware для восстановления после паники
	app.Use(recover.New())

	// Middleware для логирования запросов
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${status} - ${latency} ${method} ${path}\n",
	}))

	// Настройка CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*", // В продакшене лучше указать конкретные домены
		AllowMethods:     "GET,POST,OPTIONS",
		AllowHeaders:     "Origin,Content-Type,Accept",
		AllowCredentials: true,
		MaxAge:           12 * 3600,
	}))

	// Маршруты API с использованием адаптера для стандартных HTTP обработчиков
	app.Get("/health", adaptor.HTTPHandler(http.HandlerFunc(healthCheckHandler)))
	app.Post("/api/send-email", adaptor.HTTPHandler(http.HandlerFunc(sendEmailHandler)))

	// Получение порта из переменных окружения или использование порта по умолчанию
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Запуск сервера
	log.Printf("Сервер запущен на порту %s", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("Ошибка запуска сервера: %v", err)
	}
}

// Пользовательский обработчик ошибок
func customErrorHandler(c fiber.Ctx, err error) error {
	// Статус по умолчанию 500 - Internal Server Error
	code := fiber.StatusInternalServerError

	// Проверка на ошибки Fiber
	if e, ok := err.(*fiber.Error); ok {
		code = e.Code
	}

	// Логирование ошибки
	log.Printf("Ошибка: %v", err)

	// Отправка JSON с ошибкой
	return c.Status(code).JSON(fiber.Map{
		"error": err.Error(),
	})
}
