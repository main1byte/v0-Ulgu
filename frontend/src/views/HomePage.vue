<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title">Качественный ремонт балконов и лоджий</h1>
          <p class="hero__text">
            Профессиональный ремонт, остекление и отделка балконов с гарантией качества. 
            Работаем быстро и аккуратно!
          </p>
          <div class="hero__buttons">
            <button class="btn btn--primary btn--lg" @click="openModal('calculate')">
              Рассчитать стоимость
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
            <button class="btn btn--outline btn--lg" @click="openModal('gallery')">
              Наши работы
            </button>
          </div>
          <div class="hero__features">
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature__icon">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <span class="feature__text">Гарантия 3 года</span>
            </div>
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature__icon">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <span class="feature__text">Бесплатный замер</span>
            </div>
            <div class="feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature__icon">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <span class="feature__text">Работаем без выходных</span>
            </div>
          </div>
        </div>
        <div class="hero__image">
          <img src="/images/hero.jpg" alt="Отремонтированный балкон">
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services section">
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">Наши услуги</h2>
          <p class="section__description">
            Мы предлагаем полный комплекс услуг по ремонту и отделке балконов и лоджий любой сложности
          </p>
        </div>

        <div class="services__grid">
          <div v-for="(service, index) in services" :key="index" class="service-card">
            <div class="service-card__image">
              <img :src="service.image" :alt="service.title">
            </div>
            <div class="service-card__content">
              <h3 class="service-card__title">{{ service.title }}</h3>
              <p class="service-card__description">{{ service.description }}</p>
              <button class="service-card__button" @click="openServiceModal(service)">
                Подробнее
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="benefits section section--gray">
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">Почему выбирают нас</h2>
          <p class="section__description">
            Мы гарантируем высокое качество работ и индивидуальный подход к каждому клиенту
          </p>
        </div>

        <div class="benefits__grid">
          <div v-for="(benefit, index) in benefits" :key="index" class="benefit-card">
            <div class="benefit-card__icon" v-html="benefit.icon"></div>
            <h3 class="benefit-card__title">{{ benefit.title }}</h3>
            <p class="benefit-card__description">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="gallery section">
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">Наши работы</h2>
          <p class="section__description">
            Ознакомьтесь с примерами наших выполненных проектов
          </p>
        </div>

        <div class="gallery__grid">
          <div 
            v-for="(image, index) in galleryImages" 
            :key="index" 
            class="gallery__item"
            @click="openGalleryModal(index)"
          >
            <img :src="image" :alt="`Проект ${index + 1}`">
          </div>
        </div>

        <div class="gallery__more">
          <button class="btn btn--outline" @click="openModal('gallery')">
            Смотреть все работы
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="testimonials section section--gray">
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">Отзывы наших клиентов</h2>
          <p class="section__description">
            Что говорят о нас те, кто уже воспользовался нашими услугами
          </p>
        </div>

        <div class="testimonials__grid">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card">
            <div class="testimonial-card__rating">
              <svg 
                v-for="star in 5" 
                :key="star"
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                :fill="star <= testimonial.rating ? 'currentColor' : 'none'"
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                :class="star <= testimonial.rating ? 'star--active' : ''"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <p class="testimonial-card__text">"{{ testimonial.text }}"</p>
            <div class="testimonial-card__footer">
              <span class="testimonial-card__name">{{ testimonial.name }}</span>
              <span class="testimonial-card__date">{{ testimonial.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact section">
      <div class="container">
        <div class="contact__grid">
          <div class="contact__form-wrapper">
            <h2 class="contact__title">Свяжитесь с нами</h2>
            <p class="contact__description">
              Оставьте заявку, и наш менеджер свяжется с вами в ближайшее время для консультации и расчета стоимости
            </p>

            <form class="contact__form" @submit.prevent="submitContactForm">
              <div class="form__row">
                <div class="form__group">
                  <input type="text" v-model="contactForm.name" class="form__input" placeholder="Ваше имя" required>
                </div>
                <div class="form__group">
                  <input type="tel" v-model="contactForm.phone" class="form__input" placeholder="Ваш телефон" required>
                </div>
              </div>
              <div class="form__group">
                <input type="email" v-model="contactForm.email" class="form__input" placeholder="Ваш email">
              </div>
              <div class="form__group">
                <textarea v-model="contactForm.message" class="form__textarea" placeholder="Сообщение" rows="4"></textarea>
              </div>
              <button type="submit" class="btn btn--primary btn--lg">Отправить заявку</button>
            </form>
          </div>

          <div class="contact__info">
            <div class="contact__info-items">
              <div class="contact__info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact__info-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div>
                  <h3 class="contact__info-title">Телефон</h3>
                  <p class="contact__info-text">+7 (123) 456-7890</p>
                  <p class="contact__info-text">+7 (987) 654-3210</p>
                </div>
              </div>
              <div class="contact__info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact__info-icon">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <div>
                  <h3 class="contact__info-title">Email</h3>
                  <p class="contact__info-text">info@balkonmaster.ru</p>
                </div>
              </div>
              <div class="contact__info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact__info-icon">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>
                  <h3 class="contact__info-title">Адрес</h3>
                  <p class="contact__info-text">г. Москва, ул. Примерная, д. 123, офис 45</p>
                </div>
              </div>
              <div class="contact__info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact__info-icon">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div>
                  <h3 class="contact__info-title">Режим работы</h3>
                  <p class="contact__info-text">Пн-Пт: 9:00 - 20:00</p>
                  <p class="contact__info-text">Сб-Вс: 10:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div class="contact__map">
              <img src="/images/map.jpg" alt="Карта проезда">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <h2 class="cta__title">Готовы преобразить свой балкон?</h2>
        <p class="cta__text">
          Закажите бесплатный замер и получите консультацию специалиста прямо сейчас!
        </p>
        <button class="btn btn--secondary btn--lg" @click="openModal('callback')">
          Заказать бесплатный замер
        </button>
      </div>
    </section>

    <!-- Модальные окна -->
    <ModalCallback 
      v-if="activeModal === 'callback'" 
      @close="closeModal" 
      @submit="submitCallbackForm"
    />
    
    <ModalCalculate 
      v-if="activeModal === 'calculate'" 
      @close="closeModal" 
      @submit="submitCalculateForm"
    />
    
    <ModalService 
      v-if="activeModal === 'service'" 
      :service="selectedService" 
      @close="closeModal"
      @calculate="openModal('calculate')"
    />
    
    <ModalGallery 
      v-if="activeModal === 'gallery'" 
      :images="galleryImages" 
      :selected-index="selectedGalleryIndex" 
      @close="closeModal"
    />
    
    <ModalContact 
      v-if="activeModal === 'contact'" 
      @close="closeModal"
    />
  </div>
</template>

<script>
import ModalCallback from '@/components/modals/ModalCallback.vue'
import ModalCalculate from '@/components/modals/ModalCalculate.vue'
import ModalService from '@/components/modals/ModalService.vue'
import ModalGallery from '@/components/modals/ModalGallery.vue'
import ModalContact from '@/components/modals/ModalContact.vue'

export default {
  name: 'HomePage',
  components: {
    ModalCallback,
    ModalCalculate,
    ModalService,
    ModalGallery,
    ModalContact
  },
  data() {
    return {
      activeModal: null,
      selectedService: null,
      selectedGalleryIndex: 0,
      contactForm: {
        name: '',
        phone: '',
        email: '',
        message: ''
      },
      services: [
        {
          title: 'Остекление балконов',
          description: 'Современное остекление с использованием качественных профилей и стеклопакетов',
          image: '/images/service1.jpg',
          details: 'Мы предлагаем различные варианты остекления балконов и лоджий: холодное и теплое остекление, панорамное остекление, раздвижные системы. Используем только качественные профили от проверенных производителей с гарантией до 5 лет.'
        },
        {
          title: 'Внутренняя отделка',
          description: 'Отделка стен, потолка и пола различными материалами по вашему выбору',
          image: '/images/service2.jpg',
          details: 'Выполняем внутреннюю отделку балконов и лоджий с использованием различных материалов: вагонка (деревянная, ПВХ), панели МДФ, гипсокартон, декоративная штукатурка, плитка.'
        },
        {
          title: 'Утепление балконов',
          description: 'Качественное утепление для комфортного использования балкона в любое время года',
          image: '/images/service3.jpg',
          details: 'Проводим комплексное утепление балконов и лоджий, что позволяет использовать их как дополнительную жилую площадь круглый год. Используем современные теплоизоляционные материалы.'
        },
        {
          title: 'Наружная отделка',
          description: 'Облицовка внешней стороны балкона сайдингом, профлистом или другими материалами',
          image: '/images/service4.jpg',
          details: 'Выполняем наружную отделку балконов и лоджий различными материалами: сайдинг (виниловый, металлический), профлист, композитные панели, декоративная штукатурка.'
        },
        {
          title: 'Расширение балкона',
          description: 'Увеличение полезной площади балкона за счет выноса или перепланировки',
          image: '/images/service5.jpg',
          details: 'Предлагаем услуги по расширению балконов и лоджий с соблюдением всех строительных норм и правил. Выполняем вынос балкона по подоконнику или по полу.'
        },
        {
          title: 'Ремонт аварийных балконов',
          description: 'Восстановление и укрепление аварийных конструкций с гарантией безопасности',
          image: '/images/service6.jpg',
          details: 'Выполняем ремонт аварийных балконов любой сложности: укрепление плиты, восстановление парапета, замена ограждений, устранение протечек.'
        }
      ],
      benefits: [
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
          title: 'Гарантия качества',
          description: 'Предоставляем гарантию 3 года на все виды работ и используемые материалы'
        },
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>',
          title: 'Опытные мастера',
          description: 'В нашей команде только квалифицированные специалисты с опытом от 5 лет'
        },
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',
          title: 'Быстрые сроки',
          description: 'Выполняем работы в кратчайшие сроки без потери качества'
        },
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
          title: 'Доступные цены',
          description: 'Предлагаем конкурентные цены и гибкую систему скидок для постоянных клиентов'
        }
      ],
      galleryImages: [
        '/images/gallery1.jpg',
        '/images/gallery2.jpg',
        '/images/gallery3.jpg',
        '/images/gallery4.jpg',
        '/images/gallery5.jpg',
        '/images/gallery6.jpg',
        '/images/gallery7.jpg',
        '/images/gallery8.jpg'
      ],
      testimonials: [
        {
          name: 'Анна Петрова',
          date: '15.03.2023',
          text: 'Очень довольна работой мастеров! Остеклили балкон быстро и качественно. Особенно порадовала аккуратность - после работы всё убрали, мусора не осталось. Рекомендую!',
          rating: 5
        },
        {
          name: 'Иван Сидоров',
          date: '02.05.2023',
          text: 'Заказывал полный ремонт лоджии с утеплением. Результат превзошел ожидания! Теперь это полноценная комната, где тепло даже зимой. Спасибо за профессиональный подход.',
          rating: 5
        },
        {
          name: 'Елена Смирнова',
          date: '10.07.2023',
          text: 'Обратилась для расширения и утепления балкона. Всё сделали в оговоренные сроки, качество на высоте. Отдельное спасибо за консультацию по выбору материалов.',
          rating: 4
        }
      ]
    }
  },
  methods: {
    openModal(type) {
      this.activeModal = type
      document.body.classList.add('no-scroll')
    },
    closeModal() {
      this.activeModal = null
      document.body.classList.remove('no-scroll')
    },
    openServiceModal(service) {
      this.selectedService = service
      this.openModal('service')
    },
    openGalleryModal(index) {
      this.selectedGalleryIndex = index
      this.openModal('gallery')
    },
    async submitContactForm() {
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.contactForm.name,
            phone: this.contactForm.phone,
            email: this.contactForm.email,
            message: this.contactForm.message,
            type: 'contact'
          })
        })

        if (response.ok) {
          alert('Сообщение успешно отправлено!')
          this.contactForm = {
            name: '',
            phone: '',
            email: '',
            message: ''
          }
        } else {
          throw new Error('Ошибка при отправке')
        }
      } catch (error) {
        alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.')
        console.error(error)
      }
    },
    async submitCallbackForm(formData) {
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            type: 'callback'
          })
        })

        if (response.ok) {
          alert('Заявка на обратный звонок успешно отправлена!')
          this.closeModal()
        } else {
          throw new Error('Ошибка при отправке')
        }
      } catch (error) {
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.')
        console.error(error)
      }
    },
    async submitCalculateForm(formData) {
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            type: 'calculate'
          })
        })

        if (response.ok) {
          alert('Заявка на расчет стоимости успешно отправлена!')
          this.closeModal()
        } else {
          throw new Error('Ошибка при отправке')
        }
      } catch (error) {
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.')
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
/* Hero Section */
.hero {
  padding: 5rem 0;
  background: linear-gradient(to right, #f9fafb, #f3f4f6);
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.hero__title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero__text {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 500px;
}

.hero__buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.hero__features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature__icon {
  color: #2563eb;
}

.feature__text {
  font-size: 0.875rem;
  font-weight: 500;
}

.hero__image {
  position: relative;
  height: 400px;
  border-radius: 0.5rem;
  overflow: hidden;
}

.hero__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Services Section */
.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.service-card {
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.service-card__image {
  height: 200px;
  overflow: hidden;
}

.service-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.service-card:hover .service-card__image img {
  transform: scale(1.05);
}

.service-card__content {
  padding: 1.5rem;
}

.service-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.service-card__description {
  color: #6b7280;
  margin-bottom: 1rem;
}

.service-card__button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  background: none;
  border: none;
  padding: 0;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s;
}

.service-card__button:hover {
  color: #1d4ed8;
}

/* Benefits Section */
.benefits__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.benefit-card {
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.benefit-card__icon {
  color: #2563eb;
  margin-bottom: 1rem;
}

.benefit-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.benefit-card__description {
  color: #6b7280;
}

/* Gallery Section */
.gallery__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.gallery__item {
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery__item:hover img {
  transform: scale(1.05);
}

.gallery__more {
  margin-top: 2rem;
  text-align: center;
}

/* Testimonials Section */
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.testimonial-card {
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.testimonial-card__rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.star--active {
  color: #fbbf24;
}

.testimonial-card__text {
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.testimonial-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.testimonial-card__name {
  font-weight: 600;
}

.testimonial-card__date {
  font-size: 0.875rem;
  color: #9ca3af;
}

/* Contact Section */
.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact__title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.contact__description {
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 500px;
}

.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form__group {
  margin-bottom: 1rem;
}

.form__input,
.form__textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
}

.form__input:focus,
.form__textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.contact__info-items {
  margin-bottom: 2rem;
}

.contact__info-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contact__info-icon {
  color: #2563eb;
  flex-shrink: 0;
}

.contact__info-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.contact__info-text {
  color: #6b7280;
}

.contact__map {
  height: 300px;
  border-radius: 0.5rem;
  overflow: hidden;
}

.contact__map img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* CTA Section */
.cta {
  background-color: #2563eb;
  color: #fff;
  padding: 3rem 0;
  text-align: center;
}

.cta__title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta__text {
  max-width: 600px;
  margin: 0 auto 2rem;
}

/* Responsive */
@media (max-width: 992px) {
  .hero .container {
    grid-template-columns: 1fr;
  }
  
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .benefits__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .gallery__grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .testimonials__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .contact__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero__buttons {
    flex-direction: column;
  }
  
  .gallery__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .services__grid {
    grid-template-columns: 1fr;
  }
  
  .benefits__grid {
    grid-template-columns: 1fr;
  }
  
  .testimonials__grid {
    grid-template-columns: 1fr;
  }
  
  .form__row {
    grid-template-columns: 1fr;
  }
}
</style>
