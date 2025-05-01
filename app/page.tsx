"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Star,
  PenToolIcon as Tool,
  Shield,
  ThumbsUp,
  Zap,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

// Типы модальных окон
type ModalType = "callback" | "calculate" | "service" | "gallery" | "contact" | null

// Тип для сервиса
interface Service {
  title: string
  description: string
  image: string
  details: string
}

// Тип для отзыва
interface Testimonial {
  name: string
  date: string
  text: string
  rating: number
}

export default function LandingPage() {
  // Состояние для модальных окон
  const [modalOpen, setModalOpen] = useState<ModalType>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Данные для сервисов
  const services: Service[] = [
    {
      title: "Остекление балконов",
      description: "Современное остекление с использованием качественных профилей и стеклопакетов",
      image: "/placeholder.svg?height=300&width=400",
      details:
        "Мы предлагаем различные варианты остекления балконов и лоджий: холодное и теплое остекление, панорамное остекление, раздвижные системы. Используем только качественные профили от проверенных производителей с гарантией до 5 лет. Наши специалисты помогут подобрать оптимальный вариант под ваш бюджет и требования.",
    },
    {
      title: "Внутренняя отделка",
      description: "Отделка стен, потолка и пола различными материалами по вашему выбору",
      image: "/placeholder.svg?height=300&width=400",
      details:
        "Выполняем внутреннюю отделку балконов и лоджий с использованием различных материалов: вагонка (деревянная, ПВХ), панели МДФ, гипсокартон, декоративная штукатурка, плитка. Для потолка предлагаем натяжные потолки, реечные конструкции или покраску. Напольное покрытие - ламинат, плитка, линолеум или деревянный настил.",
    },
    {
      title: "Утепление балконов",
      description: "Качественное утепление для комфортного использования балкона в любое время года",
      image: "/placeholder.svg?height=300&width=400",
      details:
        "Проводим комплексное утепление балконов и лоджий, что позволяет использовать их как дополнительную жилую площадь круглый год. Используем современные теплоизоляционные материалы: пенофол, минеральная вата, пенопласт, экструдированный пенополистирол. Выполняем утепление стен, пола и потолка с соблюдением всех технологических требований.",
    },
    {
      title: "Наружная отделка",
      description: "Облицовка внешней стороны балкона сайдингом, профлистом или другими материалами",
      image: "/placeholder.svg?height=300&width=400",
      details:
        "Выполняем наружную отделку балконов и лоджий различными материалами: сайдинг (виниловый, металлический), профлист, композитные панели, декоративная штукатурка. Наружная отделка не только улучшает внешний вид балкона, но и обеспечивает дополнительную защиту от атмосферных воздействий.",
    },
    {
      title: "Расширение балкона",
      description: "Увеличение полезной площади балкона за счет выноса или перепланировки",
      image: "/placeholder.svg?height=300&width=400",
      details:
        "Предлагаем услуги по расширению балконов и лоджий с соблюдением всех строительных норм и правил. Выполняем вынос балкона по подоконнику или по полу, что позволяет увеличить полезную площадь. Работаем с необходимыми разрешительными документами и обеспечиваем безопасность конструкции.",
    },
    {
      title: "Ремонт аварийных балконов",
      description: "Восстановление и укрепление аварийных конструкций с гарантией безопасности",
      image: "/placeholder.svg?height=300&width=400",
      details:
        "Выполняем ремонт аварийных балконов любой сложности: укрепление плиты, восстановление парапета, замена ограждений, устранение протечек. Проводим диагностику состояния конструкции и предлагаем оптимальные решения по восстановлению с гарантией безопасности и долговечности.",
    },
  ]

  // Данные для отзывов
  const testimonials: Testimonial[] = [
    {
      name: "Анна Петрова",
      date: "15.03.2023",
      text: "Очень довольна работой мастеров! Остеклили балкон быстро и качественно. Особенно порадовала аккуратность - после работы всё убрали, мусора не осталось. Рекомендую!",
      rating: 5,
    },
    {
      name: "Иван Сидоров",
      date: "02.05.2023",
      text: "Заказывал полный ремонт лоджии с утеплением. Результат превзошел ожидания! Теперь это полноценная комната, где тепло даже зимой. Спасибо за профессиональный подход.",
      rating: 5,
    },
    {
      name: "Елена Смирнова",
      date: "10.07.2023",
      text: "Обратилась для расширения и утепления балкона. Всё сделали в оговоренные сроки, качество на высоте. Отдельное спасибо за консультацию по выбору материалов.",
      rating: 4,
    },
  ]

  // Галерея изображений
  const galleryImages = Array.from({ length: 8 }).map(
    (_, index) => `/placeholder.svg?height=300&width=300&text=Проект ${index + 1}`,
  )

  // Обработчик отправки формы обратного звонка
  const handleCallbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          type: "callback",
        }),
      })

      if (response.ok) {
        toast({
          title: "Заявка отправлена",
          description: "Мы свяжемся с вами в ближайшее время",
        })
        setModalOpen(null)
      } else {
        throw new Error("Ошибка отправки")
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      })
    }
  }

  // Обработчик отправки формы расчета стоимости
  const handleCalculateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          message: formData.get("message"),
          type: "calculate",
        }),
      })

      if (response.ok) {
        toast({
          title: "Заявка отправлена",
          description: "Мы рассчитаем стоимость и свяжемся с вами в ближайшее время",
        })
        setModalOpen(null)
      } else {
        throw new Error("Ошибка отправки")
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      })
    }
  }

  // Обработчик отправки контактной формы
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          message: formData.get("message"),
          type: "contact",
        }),
      })

      if (response.ok) {
        toast({
          title: "Сообщение отправлено",
          description: "Мы ответим вам в ближайшее время",
        })
        e.currentTarget.reset()
      } else {
        throw new Error("Ошибка отправки")
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Tool className="h-5 w-5" />
            <span>БалконМастер</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#services" className="text-sm font-medium hover:text-primary">
              Услуги
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-primary">
              Преимущества
            </Link>
            <Link href="#gallery" className="text-sm font-medium hover:text-primary">
              Галерея
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Отзывы
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Контакты
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="tel:+71234567890" className="hidden md:flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">+7 (123) 456-7890</span>
            </Link>
            <Button onClick={() => setModalOpen("callback")}>Заказать звонок</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-24 lg:py-32 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="container grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Качественный ремонт балконов и лоджий
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Профессиональный ремонт, остекление и отделка балконов с гарантией качества. Работаем быстро и аккуратно!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => setModalOpen("calculate")}>
                Рассчитать стоимость
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setModalOpen("gallery")}>
                Наши работы
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Гарантия 3 года</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Бесплатный замер</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Работаем без выходных</span>
              </div>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Отремонтированный балкон"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши услуги</h2>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              Мы предлагаем полный комплекс услуг по ремонту и отделке балконов и лоджий любой сложности
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-md">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="mt-2 text-muted-foreground">{service.description}</p>
                  <Button
                    variant="link"
                    className="mt-2 p-0"
                    onClick={() => {
                      setSelectedService(service)
                      setModalOpen("service")
                    }}
                  >
                    Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              Мы гарантируем высокое качество работ и индивидуальный подход к каждому клиенту
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Гарантия качества",
                description: "Предоставляем гарантию 3 года на все виды работ и используемые материалы",
              },
              {
                icon: <ThumbsUp className="h-10 w-10 text-primary" />,
                title: "Опытные мастера",
                description: "В нашей команде только квалифицированные специалисты с опытом от 5 лет",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Быстрые сроки",
                description: "Выполняем работы в кратчайшие сроки без потери качества",
              },
              {
                icon: <Star className="h-10 w-10 text-primary" />,
                title: "Доступные цены",
                description: "Предлагаем конкурентные цены и гибкую систему скидок для постоянных клиентов",
              },
            ].map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
                {benefit.icon}
                <h3 className="mt-4 text-xl font-bold">{benefit.title}</h3>
                <p className="mt-2 text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши работы</h2>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              Ознакомьтесь с примерами наших выполненных проектов
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => {
                  setSelectedImage(image)
                  setModalOpen("gallery")
                }}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Проект ${index + 1}`}
                  fill
                  className="object-cover transition-all hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" onClick={() => setModalOpen("gallery")}>
              Смотреть все работы
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Отзывы наших клиентов</h2>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              Что говорят о нас те, кто уже воспользовался нашими услугами
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-lg bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="text-sm text-muted-foreground">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Свяжитесь с нами</h2>
              <p className="text-muted-foreground mb-8 max-w-[500px]">
                Оставьте заявку, и наш менеджер свяжется с вами в ближайшее время для консультации и расчета стоимости
              </p>

              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input name="name" placeholder="Ваше имя" required />
                  </div>
                  <div className="space-y-2">
                    <Input name="phone" placeholder="Ваш телефон" type="tel" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Input name="email" placeholder="Ваш email" type="email" />
                </div>
                <div className="space-y-2">
                  <Textarea name="message" placeholder="Сообщение" rows={4} />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Отправить заявку
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Телефон</h3>
                    <p className="text-muted-foreground">+7 (123) 456-7890</p>
                    <p className="text-muted-foreground">+7 (987) 654-3210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">info@balkonmaster.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123, офис 45</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Режим работы</h3>
                    <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00</p>
                    <p className="text-muted-foreground">Сб-Вс: 10:00 - 18:00</p>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] rounded-lg overflow-hidden border">
                <Image
                  src="/placeholder.svg?height=300&width=600&text=Карта"
                  alt="Карта проезда"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы преобразить свой балкон?</h2>
          <p className="max-w-[600px] mx-auto mb-6">
            Закажите бесплатный замер и получите консультацию специалиста прямо сейчас!
          </p>
          <Button size="lg" variant="secondary" onClick={() => setModalOpen("callback")}>
            Заказать бесплатный замер
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Tool className="h-5 w-5" />
                <span>БалконМастер</span>
              </div>
              <p className="text-muted-foreground">
                Профессиональный ремонт и отделка балконов и лоджий с гарантией качества
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Услуги</h3>
              <ul className="space-y-2">
                {services.slice(0, 5).map((service, index) => (
                  <li key={index}>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-muted-foreground hover:text-primary"
                      onClick={() => {
                        setSelectedService(service)
                        setModalOpen("service")
                      }}
                    >
                      {service.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Информация</h3>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-muted-foreground hover:text-primary"
                    onClick={() => setModalOpen("contact")}
                  >
                    О компании
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-muted-foreground hover:text-primary"
                    onClick={() => setModalOpen("calculate")}
                  >
                    Цены
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                    Акции и скидки
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                    Блог
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-muted-foreground hover:text-primary"
                    onClick={() => setModalOpen("contact")}
                  >
                    Контакты
                  </Button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">+7 (123) 456-7890</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">info@balkonmaster.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} БалконМастер. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Модальные окна */}

      {/* Модальное окно обратного звонка */}
      <Dialog open={modalOpen === "callback"} onOpenChange={(open) => !open && setModalOpen(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Заказать обратный звонок</DialogTitle>
            <DialogDescription>
              Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCallbackSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input name="name" placeholder="Ваше имя" required />
            </div>
            <div className="space-y-2">
              <Input name="phone" placeholder="Ваш телефон" type="tel" required />
            </div>
            <Button type="submit" className="w-full">
              Отправить
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Модальное окно расчета стоимости */}
      <Dialog open={modalOpen === "calculate"} onOpenChange={(open) => !open && setModalOpen(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Рассчитать стоимость ремонта</DialogTitle>
            <DialogDescription>Заполните форму, и мы рассчитаем примерную стоимость работ</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCalculateSubmit} className="space-y-4 pt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input name="name" placeholder="Ваше имя" required />
              </div>
              <div className="space-y-2">
                <Input name="phone" placeholder="Ваш телефон" type="tel" required />
              </div>
            </div>
            <div className="space-y-2">
              <Input name="email" placeholder="Ваш email" type="email" />
            </div>
            <div className="space-y-2">
              <Textarea name="message" placeholder="Опишите, какие работы вас интересуют" rows={4} />
            </div>
            <Button type="submit" className="w-full">
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Модальное окно услуги */}
      <Dialog open={modalOpen === "service"} onOpenChange={(open) => !open && setModalOpen(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedService?.title}</DialogTitle>
          </DialogHeader>
          <div className="relative h-[200px] w-full overflow-hidden rounded-md">
            <Image
              src={selectedService?.image || "/placeholder.svg"}
              alt={selectedService?.title || "Услуга"}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-muted-foreground">{selectedService?.details}</p>
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button variant="outline">Закрыть</Button>
            </DialogClose>
            <Button
              onClick={() => {
                setModalOpen("calculate")
              }}
            >
              Рассчитать стоимость
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно галереи */}
      <Dialog open={modalOpen === "gallery"} onOpenChange={(open) => !open && setModalOpen(null)}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Галерея наших работ</DialogTitle>
          </DialogHeader>
          {selectedImage ? (
            <div className="relative h-[400px] w-full overflow-hidden rounded-md mb-4">
              <Image src={selectedImage || "/placeholder.svg"} alt="Проект" fill className="object-contain" />
            </div>
          ) : null}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer ${selectedImage === image ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedImage(image)}
              >
                <Image src={image || "/placeholder.svg"} alt={`Проект ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно контактов */}
      <Dialog open={modalOpen === "contact"} onOpenChange={(open) => !open && setModalOpen(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Контактная информация</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Телефон</h3>
                <p className="text-muted-foreground">+7 (123) 456-7890</p>
                <p className="text-muted-foreground">+7 (987) 654-3210</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">info@balkonmaster.ru</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Адрес</h3>
                <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123, офис 45</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Режим работы!</h3>
                <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00</p>
                <p className="text-muted-foreground">Сб-Вс: 10:00 - 18:00</p>
              </div>
            </div>
          </div>
          <div className="relative h-[200px] rounded-lg overflow-hidden border">
            <Image
              src="/placeholder.svg?height=200&width=500&text=Карта"
              alt="Карта проезда"
              fill
              className="object-cover"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
