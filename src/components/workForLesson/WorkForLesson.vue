<script setup>
  import {reactive, defineAsyncComponent} from 'vue'

  import './style.css'

  const ModalAddWork = defineAsyncComponent(
    () => import('@/components/modalAddWork/ModalAddWork.vue')
  )
  const objModal = reactive({
    addWorkModal: false,
  })
</script>

<template>
  <div class="additional-post_content">
    <p class="single_post-content_title">Работы к уроку</p>
    <div class="additional-post_content-work_add">
      <p class="work_add-text">Здесь не хватает вашей работы! Добавим?</p>
      <div @click="objModal.addWorkModal = true" class="work_add-button">
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.656" cy="20.7957" r="20" fill="black"></circle><path d="M20.656 15.7957V25.7957M15.656 20.7957H25.656" stroke="#F1F1F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
    </div>
  </div>
  <ModalAddWork 
    v-if="objModal.addWorkModal"
    :activeModal="objModal.addWorkModal" 
    @closeModal="(close) => objModal.addWorkModal = close"/>
</template>