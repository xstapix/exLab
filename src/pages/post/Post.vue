<script setup>
  import {reactive} from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import {getMethods} from '@/methods.js'

  import SideBar from '@/components/sideBar/SideBar.vue'
  import Carousel from '@/components/swiper/Carousel.vue'
  import { useAuthStore } from '@/stores/authStore' 

  import './style.css'
  import './media-style.css'
  
  const route = useRoute()
  const router = useRouter()
  const useMethod = getMethods()
  const authStore = useAuthStore()

  document.body.style.backgroundColor = '#E5E5E5'
  
  const state = reactive({
    postViewed: {},
    renderKey: 1,
    amountPost: 0
  })

  if (!authStore.data.auth) {
    router.push('/login')
  }

  setState()

  async function setState() {
    const allPosts = await useMethod.getPosts()
    state.postViewed = allPosts[route.params.id]
    state.amountPost = allPosts.length
  }
  
  const re_render = () => {
    state.renderKey++
    setState()
}
</script>

<template>
  <div class="DF" :key="renderKey">
    <SideBar/>
    <router-link :to="`/post/${state.postViewed.id - 1 }`" 
      @click="re_render" 
      class="postPrew"
      v-if="route.params.id != 0">
    </router-link>
    <div v-else></div>
    <div class="single_post-body">
      <div class="single_post-content">
        <p class="single_post-content_title">{{ state.postViewed.title }}</p>
        <p class="single_post-content_main_text">{{ state.postViewed.previewText }}</p>
      </div>
      <Carousel :activePost="state.postViewed"/>
    </div>
    <router-link :to="`/post/${state.postViewed.id + 1 }`" 
      @click="re_render" 
      class="postNext"
      v-if="route.params.id != state.amountPost - 1">
    </router-link>
    <div v-else></div>
  </div>
</template>