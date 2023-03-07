<script setup>
  import { reactive, defineAsyncComponent } from 'vue'
  import { getWindowSizeStore } from '@/stores/windowSizeStore' 
  import { useRoute } from 'vue-router'

  import './style.css'
  import './media-style.css'

  const ModalAddWork = defineAsyncComponent(
    () => import('@/components/modalAddWork/ModalAddWork.vue')
  )

  const windowSizeStore = getWindowSizeStore()
  const route = useRoute()

  const objModal = reactive({
    addWorkModal: false,
  })
</script>

<template>
  <div class="additional-post_content">
    <p class="single_post-content_title">Работы к уроку</p>
    <div class="DF FWW">
      <div v-if="windowSizeStore.objAdaptive.currentSize > 620" class="content-work_box_add content-work_box-item">
        <p class="work_add-text">Здесь не хватает вашей работы! Добавим?</p>
        <div @click="objModal.addWorkModal = true" class="work_add-button">
          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.656" cy="20.7957" r="20" fill="black"></circle><path d="M20.656 15.7957V25.7957M15.656 20.7957H25.656" stroke="#F1F1F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
      </div>
      <router-link :to="`/materials/${route.params.link}/work/${1}`" class="content-work_box-item">
        <div class="content-work_box-item_bg" ></div>
      </router-link>
      <router-link :to="`/materials/${route.params.link}/work/${1}`" class="content-work_box-item">
        <div class="content-work_box-item_bg" ></div>
      </router-link>
      <router-link :to="`/materials/${route.params.link}/work/${1}`" class="content-work_box-item">
        <div class="content-work_box-item_bg" ></div>
      </router-link>
      <router-link :to="`/materials/${route.params.link}/work/${135}`" class="content-work_box-item">
        <div class="content-work_box-item_bg" ></div>
      </router-link>
    </div>
    <button class="additional-post_content-more_work">Показать еще +</button>
  </div>
  <ModalAddWork 
    v-if="objModal.addWorkModal"
    :activeModal="objModal.addWorkModal" 
    @closeModal="(close) => objModal.addWorkModal = close"/>
</template>