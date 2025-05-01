<template>
  <div class="modal">
    <div class="modal__overlay" @click="close"></div>
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__title">Рассчитать стоимость ремонта</h2>
        <button class="modal__close" @click="close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      <div class="modal__body">
        <p class="modal__description">
          Заполните форму, и мы рассчитаем примерную стоимость работ
        </p>
        <form class="modal__form" @submit.prevent="submitForm">
          <div class="form__row">
            <div class="form__group">
              <input type="text" v-model="form.name" class="form__input" placeholder="Ваше имя" required>
            </div>
            <div class="form__group">
              <input type="tel" v-model="form.phone" class="form__input" placeholder="Ваш телефон" required>
            </div>
          </div>
          <div class="form__group">
            <input type="email" v-model="form.email" class="form__input" placeholder="Ваш email">
          </div>
          <div class="form__group">
            <textarea v-model="form.message" class="form__textarea" placeholder="Опишите, какие работы вас интересуют" rows="4"></textarea>
          </div>
          <button type="submit" class="btn btn--primary btn--full">Отправить заявку</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalCalculate',
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        message: ''
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleEscape)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscape)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submitForm() {
      this.$emit('submit', this.form)
    },
    handleEscape(e) {
      if (e.key === 'Escape') {
        this.close()
      }
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal__content {
  position: relative;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.modal__close {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.3s;
}

.modal__close:hover {
  color: #111827;
}

.modal__body {
  padding: 1.5rem;
}

.modal__description {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.modal__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.btn--full {
  width: 100%;
}

@media (max-width: 576px) {
  .form__row {
    grid-template-columns: 1fr;
  }
}
</style>
