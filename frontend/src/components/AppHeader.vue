<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__logo">
        <div class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo__icon">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
            <path d="m15 5 4 4"></path>
          </svg>
          <span class="logo__text">БалконМастер</span>
        </div>
      </div>
      
      <nav class="header__nav" :class="{ 'header__nav--active': isMenuOpen }">
        <ul class="nav__list">
          <li class="nav__item">
            <a href="#services" class="nav__link" @click="closeMenu">Услуги</a>
          </li>
          <li class="nav__item">
            <a href="#benefits" class="nav__link" @click="closeMenu">Преимущества</a>
          </li>
          <li class="nav__item">
            <a href="#gallery" class="nav__link" @click="closeMenu">Галерея</a>
          </li>
          <li class="nav__item">
            <a href="#testimonials" class="nav__link" @click="closeMenu">Отзывы</a>
          </li>
          <li class="nav__item">
            <a href="#contact" class="nav__link" @click="closeMenu">Контакты</a>
          </li>
        </ul>
      </nav>
      
      <div class="header__contact">
        <a href="tel:+71234567890" class="header__phone">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>+7 (123) 456-7890</span>
        </a>
        <button class="btn btn--primary" @click="openModal('callback')">Заказать звонок</button>
      </div>
      
      <button class="header__burger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      document.body.classList.toggle('no-scroll', this.isMenuOpen)
    },
    closeMenu() {
      this.isMenuOpen = false
      document.body.classList.remove('no-scroll')
    },
    openModal(type) {
      this.$emit('open-modal', type)
    }
  }
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.logo__icon {
  margin-right: 0.5rem;
  color: #2563eb;
}

.nav__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__item {
  margin: 0 1rem;
}

.nav__link {
  color: #333;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.3s;
}

.nav__link:hover {
  color: #2563eb;
}

.header__contact {
  display: flex;
  align-items: center;
}

.header__phone {
  display: flex;
  align-items: center;
  margin-right: 1rem;
  color: #333;
  text-decoration: none;
  font-size: 0.875rem;
}

.header__phone svg {
  margin-right: 0.5rem;
  color: #2563eb;
}

.header__burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
}

.header__burger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #333;
  transition: all 0.3s;
}

@media (max-width: 992px) {
  .header__nav {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: #fff;
    transform: translateX(-100%);
    transition: transform 0.3s;
    z-index: 99;
  }
  
  .header__nav--active {
    transform: translateX(0);
  }
  
  .nav__list {
    flex-direction: column;
    padding: 2rem;
  }
  
  .nav__item {
    margin: 1rem 0;
  }
  
  .header__contact {
    display: none;
  }
  
  .header__burger {
    display: flex;
  }
}
</style>
