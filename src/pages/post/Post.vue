<script setup>
  import {reactive, defineAsyncComponent} from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import {getMethods} from '@/methods.js'

  import TheSideBar from '@/components/sideBar/TheSideBar.vue'
  import Carousel from '@/components/swiper/Carousel.vue'
  import { useAuthStore } from '@/stores/authStore' 
  import {useStore} from '@/stores/postStore'

  import './style.css'
  import './media-style.css'

  const ModalAddWork = defineAsyncComponent(
    () => import('@/components/modalAddWork/ModalAddWork.vue')
  )
  
  const route = useRoute()
  const router = useRouter()
  const useMethod = getMethods()
  const authStore = useAuthStore()
  const postsStore = useStore()

  document.body.style.backgroundColor = '#E5E5E5'
  
  const objPost = reactive({
    postViewed: {},
    nextPost: null,
    prevPost: null,
    renderKey: 0
  })

  const objModal = reactive({
    addWorkModal: false,
  })

  if (!authStore.data.auth) {
    router.push('/login')
  }

  setObjPost()

  async function setObjPost() {
    objPost.postViewed = await useMethod.getPost(route.params.id)
    objPost.renderKey++
  }
  
  const nextPost = async () => {
    objPost.postViewed = await useMethod.getPost(Number(route.params.id) + 1)
    objPost.renderKey++
  }

  const prevPost = async () => {
    objPost.postViewed = await useMethod.getPost(Number(route.params.id) - 1)
    objPost.renderKey++
  }
</script>

<template>
  <div class="DF">
    <TheSideBar/>
    <router-link :to="`/post/${Number(objPost.postViewed.id) - 1}`" 
      @click="prevPost" 
      class="postPrew"
      v-if="route.params.id != 0">
    </router-link>
    <div v-else></div>
    <div class="single_post-body">
      <div class="single_post-content">
        <p class="single_post-content_title">{{ objPost.postViewed.title }}</p>
        <p class="single_post-content_main_text">{{ objPost.postViewed.previewText }}</p>
      </div>
      <div class="single_post-content">
        <p class="single_post-content_title">Работы к уроку</p>
        <div class="single_post-content-work_add">
          <p class="work_add-text">Здесь не хватает вашей работы! Добавим?</p>
          <div @click="objModal.addWorkModal = true" class="work_add-button">
            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.656" cy="20.7957" r="20" fill="black"></circle><path d="M20.656 15.7957V25.7957M15.656 20.7957H25.656" stroke="#F1F1F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
        </div>
      </div>
      <Carousel :key="objPost.renderKey" :activePost="objPost.postViewed"/>
    </div>
    <router-link :to="`/post/${Number(objPost.postViewed.id) + 1}`" 
      @click="nextPost" 
      class="postNext"
      v-if="route.params.id != postsStore.data.posts.length - 1">
    </router-link>
    <div v-else></div>
  </div>
  <ModalAddWork 
    v-if="objModal.addWorkModal"
    :activeModal="objModal.addWorkModal" 
    @closeModal="(close) => objModal.addWorkModal = close"/>
  
</template>