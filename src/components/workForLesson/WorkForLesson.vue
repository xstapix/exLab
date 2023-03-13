<script setup>
  import { reactive, defineAsyncComponent } from 'vue'
  import { getWindowSizeStore } from '@/stores/windowSizeStore' 
  import { useRoute } from 'vue-router'

  import './style.css'
  import './media-style.css'

  const emit = defineEmits(['showWorkModal'])

  const windowSizeStore = getWindowSizeStore()
  const route = useRoute()

  const props = defineProps({
    works: Array
  })

  const objModal = reactive({
    addWorkModal: false,
  })
</script>

<template>
  <div class="additional-post_content">
    <div class="add_post-tip DF">
      +2
      <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.15129 1.0843C6.54247 0.454335 7.45918 0.454335 7.85036 1.0843L9.25806 3.35128C9.39565 3.57286 9.61437 3.73191 9.86756 3.79452L12.4578 4.43498C13.1768 4.61276 13.4597 5.48318 12.9828 6.04977L11.2619 8.09385C11.0942 8.29311 11.0108 8.54997 11.0295 8.80977L11.2217 11.475C11.275 12.2143 10.5336 12.7526 9.84717 12.4731L7.37793 11.4677C7.13616 11.3692 6.86549 11.3692 6.62372 11.4677L4.15448 12.4731C3.46801 12.7526 2.72667 12.2143 2.77997 11.475L2.97211 8.80977C2.99084 8.54997 2.90745 8.29311 2.7397 8.09385L1.01889 6.04977C0.541904 5.48318 0.824883 4.61276 1.54386 4.43498L4.13408 3.79452C4.38728 3.73191 4.606 3.57286 4.74359 3.35128L6.15129 1.0843Z" fill="#7000FF"></path></svg>
      за работы к уроку
    </div>
    <p class="single_post-content_title">Работы к уроку</p>
    <div class="DF FWW">
      <div v-if="windowSizeStore.objAdaptive.currentSize > 620" class="content-work_box_add content-work_box-item">
        <p class="work_add-text">Здесь не хватает вашей работы! Добавим?</p>
        <div @click="emit('showWorkModal', true)" class="work_add-button">
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
</template>