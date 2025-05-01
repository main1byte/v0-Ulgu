<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__column">
          <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo__icon">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
              <path d="m15 5 4 4"></path>
            </svg>
            <span class="logo__text">БалконМастер</span>
          </div>
          <p class="footer__text">
            Профессиональный ремонт и отделка балконов и лоджий с гарантией качества
          </p>
        </div>

        <div class="footer__column">
          <h3 class="footer__title">Услуги</h3>
          <ul class="footer__list">
            <li><a href="#" class="footer__link">Остекление балконов</a></li>
            <li><a href="#" class="footer__link">Внутренняя отделка</a></li>
            <li><a href="#" class="footer__link">Утепление балконов</a></li>
            <li><a href="#" class="footer__link">Наружная отделка</a></li>
            <li><a href="#" class="footer__link">Расширение балкона</a></li>
          </ul>
        </div>

        <div class="footer__column">
          <h3 class="footer__title">Информация</h3>
          <ul class="footer__list">
            <li><a href="#" class="footer__link">О компании</a></li>
            <li><a href="#" class="footer__link">Цены</a></li>
            <li><a href="#" class="footer__link">Акции и скидки</a></li>
            <li><a href="#" class="footer__link">Блог</a></li>
            <li><a href="#" class="footer__link">Контакты</a></li>
          </ul>
        </div>

        <div class="footer__column">
          <h3 class="footer__title">Контакты</h3>
          <ul class="footer__contacts">
            <li class="footer__contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+7 (123) 456-7890</span>
            </li>
            <li class="footer__contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <span>info@balkonmaster.ru</span>
            </li>
            <li class="footer__contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>г. Москва, ул. Примерная, д. 123</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">© {{ new Date().getFullYear() }} БалконМастер. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  background-color: #f9fafb;
  padding: 3rem 0 1rem;
  border-top: 1px solid #e5e7eb;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer__title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.footer__text {
  color: #6b7280;
  margin-top: 1rem;
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__list li {
  margin-bottom: 0.5rem;
}

.footer__link {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.3s;
}

.footer__link:hover {
  color: #2563eb;
}

.footer__contacts {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #6b7280;
}

.footer__contact-item svg {
  margin-right: 0.5rem;
  color: #2563eb;
}

.footer__bottom {
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
}

.footer__copyright {
  color: #6b7280;
  font-size: 0.875rem;
}

@media (max-width: 992px) {
  .footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
