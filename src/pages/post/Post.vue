<script setup>
  import {reactive, defineAsyncComponent} from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import {getMethods} from '@/methods.js'

  import TheSideBar from '@/components/sideBar/TheSideBar.vue'
  import Carousel from '@/components/swiper/Carousel.vue'
  import TheNotes from '@/components/notes/TheNotes.vue'

  import { useAuthStore } from '@/stores/authStore' 
  import {useStore} from '@/stores/postStore'

  import './style.css'
  import './media-style.css'

  const UsefulMaterials = defineAsyncComponent(
    () => import('@/components/usefulMaterials/UsefulMaterials.vue')
  )

  const WorkForLesson = defineAsyncComponent(
    () => import('@/components/workForLesson/WorkForLesson.vue')
  )
  
  const route = useRoute()
  const router = useRouter()
  const useMethod = getMethods()
  const authStore = useAuthStore()
  const postsStore = useStore()

  document.body.style.backgroundColor = '#E5E5E5'
  
  const objPost = reactive({
    postViewed: {},
    renderKey: 0
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
    <div class="DF JCC single_post">
      <div style="width: 60px; flex-shrink: 0;"></div>
      <div class="single_post-body">
        <div>
          <p class="single_post-content_title">{{ objPost.postViewed.title }}</p>
          <p class="single_post-content_main_text">{{ objPost.postViewed.previewText }}</p>
        </div>
        <UsefulMaterials
          :key="objPost.renderKey"
          :postViewed="objPost.postViewed"/>
        <WorkForLesson/>
        <Carousel 
          :key="objPost.renderKey" 
          :activePost="objPost.postViewed"/>
      </div>
      <TheNotes/>
    </div>
    <router-link :to="`/post/${Number(objPost.postViewed.id) + 1}`" 
      @click="nextPost" 
      class="postNext"
      v-if="route.params.id != postsStore.data.posts.length - 1">
    </router-link>
    <div v-else></div>
  </div>
  
</template>