import { NextResponse } from "next/server"

// Интерфейс для данных формы
interface ContactFormData {
  name: string
  phone: string
  email?: string
  message?: string
  type: "callback" | "calculate" | "contact"
}

// URL Golang бэкенда
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080"

export async function POST(request: Request) {
  try {
    // Получаем данные из запроса
    const data: ContactFormData = await request.json()

    // Проверяем обязательные поля
    if (!data.name || !data.phone) {
      return NextResponse.json({ error: "Имя и телефон обязательны для заполнения" }, { status: 400 })
    }

    // Формируем тему письма в зависимости от типа формы
    let subject = ""
    switch (data.type) {
      case "callback":
        subject = "Заявка на обратный звонок"
        break
      case "calculate":
        subject = "Заявка на расчет стоимости"
        break
      case "contact":
        subject = "Сообщение с сайта"
        break
      default:
        subject = "Новая заявка с сайта"
    }

    // Отправляем данные на Golang бэкенд для отправки email
    const response = await fetch(`${BACKEND_URL}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        name: data.name,
        phone: data.phone,
        email: data.email || "",
        message: data.message || "",
        type: data.type,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Ошибка при отправке на Golang бэкенд:", errorData)
      return NextResponse.json({ error: errorData.error || "Ошибка при отправке" }, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Ошибка при обработке запроса:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
