<script setup>
  import {reactive} from 'vue'
  import { useRoute } from 'vue-router'
  import {useStore} from '@/stores/postStore'

  import SideBar from '@/components/sideBar/SideBar.vue'
  import Carousel from '@/components/swiper/Carousel.vue'

  import './style.css'
  import './media-style.css'
  
  const route = useRoute()
  const postsStore = useStore()

  document.body.style.backgroundColor = '#E5E5E5'
  
  const state = reactive({
    postViewed: postsStore.data.posts[route.params.id],
  })

</script>

<template>
  <div class="DF">
    <SideBar/>
    <router-view :key="route.fullPath" />
    <router-link :to="`/post/${state.postViewed.id - 1 }`" :key="route.fullPath" class="postPrew"></router-link>
    <div class="single_post-body">
      <div class="single_post-content">
        <p class="single_post-content_title">{{ state.postViewed.title }}</p>
        <p class="single_post-content_main_text">{{ state.postViewed.previewText }}</p>
      </div>
      <Carousel :activePost="state.postViewed"/>
    </div>
    <router-link :to="`/post/${state.postViewed.id + 1 }`" class="postNext"></router-link>
  </div>
</template>