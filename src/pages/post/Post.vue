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
  import '@/components/modalBlockedPost/style.css'

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

  setObjPost()

  async function setObjPost() {
    objPost.postViewed = await useMethod.getPost(route.params.link)
    objPost.renderKey++
  }
  
  const nextPost = async () => {
    objPost.postViewed = await useMethod.getPost(route.params.link) //next
    objPost.renderKey++
  }

  const prevPost = async () => {
    objPost.postViewed = await useMethod.getPost(route.params.link) //prew
    objPost.renderKey++
  }

</script>

<template>
  <div class="DF">
    <TheSideBar/>
    <div class="post-body">
      <router-link :to="`/post/${Number(objPost.postViewed.id) - 1}`" 
        @click="prevPost" 
        class="postPrew"
        v-if="route.params.id != 0">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M22 14L16 20L22 26" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </router-link>
      <div v-else></div>
      <div class="DF JCC single_post">
        <div v-if="authStore.data.auth" style="width: 60px; flex-shrink: 0;"></div>
        <div class="single_post-body">
          <div class="DF AIC">
            <div class="post_info_author">
              <img class="post_info_author-img" src="/yyhqfinwoon1yvcb6hm7jam67nnus0ec.png" alt="">
            </div>
            <div class="post_info_type">
              <!-- <svg v-if="post.type.name === 'Текст'" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="black"></circle><path d="M14.6666 23.4055C14.5838 23.4055 14.5166 23.4727 14.5166 23.5555V24.5333C14.5166 24.6162 14.5838 24.6833 14.6666 24.6833H21C21.1694 24.6833 21.3319 24.616 21.4517 24.4962C21.5715 24.3764 21.6388 24.2139 21.6388 24.0444C21.6388 23.875 21.5715 23.7125 21.4517 23.5927L21.3459 23.6985L21.4517 23.5927C21.3319 23.4729 21.1694 23.4055 21 23.4055H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 20.7389C14.5838 20.7389 14.5166 20.8061 14.5166 20.8889V21.8667C14.5166 21.9495 14.5838 22.0167 14.6666 22.0167H24.4444C24.6138 22.0167 24.7764 21.9494 24.8962 21.8296C25.016 21.7098 25.0833 21.5472 25.0833 21.3778C25.0833 21.2084 25.016 21.0459 24.8962 20.926C24.7764 20.8062 24.6138 20.7389 24.4444 20.7389H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 18.0722C14.5838 18.0722 14.5166 18.1393 14.5166 18.2222V19.1999C14.5166 19.2828 14.5838 19.3499 14.6666 19.3499H21.5555C21.6394 19.3499 21.7225 19.3334 21.8 19.3013C21.8775 19.2692 21.948 19.2221 22.0073 19.1628C22.0666 19.1035 22.1137 19.0331 22.1458 18.9555C22.1779 18.878 22.1944 18.795 22.1944 18.7111C22.1944 18.6272 22.1779 18.5441 22.1458 18.4666C22.1137 18.3891 22.0666 18.3186 22.0073 18.2593C21.948 18.2 21.8775 18.1529 21.8 18.1208C21.7225 18.0887 21.6394 18.0722 21.5555 18.0722H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 15.4055C14.5838 15.4055 14.5166 15.4727 14.5166 15.5555V16.5333C14.5166 16.6162 14.5838 16.6833 14.6666 16.6833H25C25.1694 16.6833 25.3319 16.616 25.4517 16.4962C25.5715 16.3764 25.6388 16.2139 25.6388 16.0444C25.6388 15.875 25.5715 15.7125 25.4517 15.5927C25.3319 15.4729 25.1694 15.4055 25 15.4055H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path></svg> -->
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="black"></circle><path d="M23.9999 16.6667C23.9999 15.9314 23.4019 15.3334 22.6666 15.3334H14.6666C13.9313 15.3334 13.3333 15.9314 13.3333 16.6667V23.3334C13.3333 24.0687 13.9313 24.6667 14.6666 24.6667H22.6666C23.4019 24.6667 23.9999 24.0687 23.9999 23.3334V21.1114L26.6666 23.3334V16.6667L23.9999 18.8887V16.6667Z" fill="white"></path></svg>
            </div>
            <div class="post_info_date">
              <p class="info_date_text-gray">08.02.2023</p>
              <p class="info_date_text-gray">42 минут</p>
            </div>
          </div>
          <div class="single_post-content">
            <div class="add_post-tip DF">
              + 0.1
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.15129 1.0843C6.54247 0.454335 7.45918 0.454335 7.85036 1.0843L9.25806 3.35128C9.39565 3.57286 9.61437 3.73191 9.86756 3.79452L12.4578 4.43498C13.1768 4.61276 13.4597 5.48318 12.9828 6.04977L11.2619 8.09385C11.0942 8.29311 11.0108 8.54997 11.0295 8.80977L11.2217 11.475C11.275 12.2143 10.5336 12.7526 9.84717 12.4731L7.37793 11.4677C7.13616 11.3692 6.86549 11.3692 6.62372 11.4677L4.15448 12.4731C3.46801 12.7526 2.72667 12.2143 2.77997 11.475L2.97211 8.80977C2.99084 8.54997 2.90745 8.29311 2.7397 8.09385L1.01889 6.04977C0.541904 5.48318 0.824883 4.61276 1.54386 4.43498L4.13408 3.79452C4.38728 3.73191 4.606 3.57286 4.74359 3.35128L6.15129 1.0843Z" fill="#7000FF"></path></svg>
              за завершенный материал
            </div>
            <p class="single_post-content_title">Марафон по социальным сетям. Готовим аккаунт к продвижению</p>
            <p v-if="authStore.data.auth" class="single_post-content_main_text">Дайджест материалов за январь 2023</p>
          </div>
          <UsefulMaterials
            v-if="authStore.data.auth"
            :key="objPost.renderKey"
            :postViewed="objPost.postViewed"/>
          <WorkForLesson
            v-if="authStore.data.auth"/>
          <Carousel 
            v-if="authStore.data.auth"
            :key="objPost.renderKey" 
            :activePost="objPost.postViewed"/>
          <div v-if="!authStore.data.auth" class="blocked-modal_body">
            <p class="blocked-modal_body-text">Вы хотите присоединитсья к клубу?</p>
            <p class="blocked-modal_body-desc">Данный материал доступен только в рамках клуба дизайнеров «1000 звёзд».</p>
            <div class="DF blocked-modal_body-btn">
              <a href="https://school.krona.studio/club-1000-stars" target="_blank" class="blocked-modal_body-join">Присоединиться</a>
              <router-link to="/" class="blocked-modal_body-cancel">Отмена</router-link>
            </div>
          </div>
        </div>
        <TheNotes v-if="authStore.data.auth"/>
      </div>
      <router-link :to="`/post/${Number(objPost.postViewed.id) + 1}`" 
        @click="nextPost" 
        class="postNext"
        v-if="route.params.id != postsStore.data.posts.length - 1">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle r="20" transform="matrix(-1 0 0 1 20 20)" fill="white"></circle><path d="M18 14L24 20L18 26" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </router-link>
      <div v-else></div>
    </div>
  </div>
  
</template>