<template>
  <div class="modal">
    <div class="modal__overlay" @click="close"></div>
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__title">{{ service.title }}</h2>
        <button class="modal__close" @click="close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      <div class="modal__body">
        <div class="service-image">
          <img :src="service.image" :alt="service.title">
        </div>
        <p class="service-details">{{ service.details }}</p>
        <div class="modal__actions">
          <button class="btn btn--outline" @click="close">Закрыть</button>
          <button class="btn btn--primary" @click="calculate">Рассчитать стоимость</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalService',
  props: {
    service: {
      type: Object,
      required: true
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
    calculate() {
      this.$emit('calculate')
    },
    handleEscape(e) {
      if (e.key === 'Escape') {
        this.close()
