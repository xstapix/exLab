<script setup>
  import {useStore} from '@/stores/postStore'
  import { useAuthStore } from '@/stores/authStore'

  import ModalAddPost from '@/components/modalAddPost/ModalAddPost.vue'

  import {watch, reactive} from 'vue'

  import './style.css'

  const postsStore = useStore()
  const authStore = useAuthStore()

  const objCurrentUser = reactive({
    user: authStore.data.user
  })

  const objModal = reactive({
    activeModal: false
  })

  watch(authStore.data, (newUser) => {
    objCurrentUser.user = newUser.user;
  })

  const handlerFavorite = (e) => {
    if (e.target.classList.length === 2) {
      for (let index = 0; index < objCurrentUser.user.account.favorites.length; index++) {
        if (objCurrentUser.user.account.favorites[index] == e.target.id) {
          objCurrentUser.user.account.favorites.splice(index, 1)
          break
        }
      }
    } else objCurrentUser.user.account.favorites.push(e.target.id)
  } 

  const handlerCheck = (e) => {
    if (e.target.classList.length === 2) {
      for (let index = 0; index < objCurrentUser.user.account.viewed.length; index++) {
        if (objCurrentUser.user.account.viewed[index] == e.target.id) {
          objCurrentUser.user.account.viewed.splice(index, 1)
          break
        }
      }
    } else objCurrentUser.user.account.viewed.push(e.target.id)
  }

 </script>

<template>
  <div v-if="postsStore.data.posts" class="postsBody"> 
    <div class="add_post">
      <div class="add_post-tip DF">
        +3
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.15129 1.0843C6.54247 0.454335 7.45918 0.454335 7.85036 1.0843L9.25806 3.35128C9.39565 3.57286 9.61437 3.73191 9.86756 3.79452L12.4578 4.43498C13.1768 4.61276 13.4597 5.48318 12.9828 6.04977L11.2619 8.09385C11.0942 8.29311 11.0108 8.54997 11.0295 8.80977L11.2217 11.475C11.275 12.2143 10.5336 12.7526 9.84717 12.4731L7.37793 11.4677C7.13616 11.3692 6.86549 11.3692 6.62372 11.4677L4.15448 12.4731C3.46801 12.7526 2.72667 12.2143 2.77997 11.475L2.97211 8.80977C2.99084 8.54997 2.90745 8.29311 2.7397 8.09385L1.01889 6.04977C0.541904 5.48318 0.824883 4.61276 1.54386 4.43498L4.13408 3.79452C4.38728 3.73191 4.606 3.57286 4.74359 3.35128L6.15129 1.0843Z" fill="#7000FF"></path></svg>
        за материал
      </div>
      <p class="add_post-text">Вы можете опубликовать свой материал! Опубликуем?</p>
      <div @click="objModal.activeModal = true" class="add_post-img">
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.5" cy="20.3966" r="20" fill="white"></circle><circle cx="20.6562" cy="20.2921" r="20" fill="white"></circle><path d="M20.6562 15.2921V25.2921M15.6562 20.2921H25.6562" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
    </div>
    <div v-for="post in postsStore.data.posts" :key="post.id" class="post DF" 
      :class="objCurrentUser.user ? objCurrentUser.user.account.viewed.includes(post.id) ? 'post_checked' :  '' : ''">
      <router-link :to="`/post/${post.id}`">
        <div class="post_info DF JCSB">
          <div class="DF AIC">
            <div class="post_info_author">
              <img class="post_info_author-img" src="/yyhqfinwoon1yvcb6hm7jam67nnus0ec.png" alt="">
            </div>
            <div class="post_info_type">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="black"></circle><path d="M14.6666 23.4055C14.5838 23.4055 14.5166 23.4727 14.5166 23.5555V24.5333C14.5166 24.6162 14.5838 24.6833 14.6666 24.6833H21C21.1694 24.6833 21.3319 24.616 21.4517 24.4962C21.5715 24.3764 21.6388 24.2139 21.6388 24.0444C21.6388 23.875 21.5715 23.7125 21.4517 23.5927L21.3459 23.6985L21.4517 23.5927C21.3319 23.4729 21.1694 23.4055 21 23.4055H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 20.7389C14.5838 20.7389 14.5166 20.8061 14.5166 20.8889V21.8667C14.5166 21.9495 14.5838 22.0167 14.6666 22.0167H24.4444C24.6138 22.0167 24.7764 21.9494 24.8962 21.8296C25.016 21.7098 25.0833 21.5472 25.0833 21.3778C25.0833 21.2084 25.016 21.0459 24.8962 20.926C24.7764 20.8062 24.6138 20.7389 24.4444 20.7389H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 18.0722C14.5838 18.0722 14.5166 18.1393 14.5166 18.2222V19.1999C14.5166 19.2828 14.5838 19.3499 14.6666 19.3499H21.5555C21.6394 19.3499 21.7225 19.3334 21.8 19.3013C21.8775 19.2692 21.948 19.2221 22.0073 19.1628C22.0666 19.1035 22.1137 19.0331 22.1458 18.9555C22.1779 18.878 22.1944 18.795 22.1944 18.7111C22.1944 18.6272 22.1779 18.5441 22.1458 18.4666C22.1137 18.3891 22.0666 18.3186 22.0073 18.2593C21.948 18.2 21.8775 18.1529 21.8 18.1208C21.7225 18.0887 21.6394 18.0722 21.5555 18.0722H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 15.4055C14.5838 15.4055 14.5166 15.4727 14.5166 15.5555V16.5333C14.5166 16.6162 14.5838 16.6833 14.6666 16.6833H25C25.1694 16.6833 25.3319 16.616 25.4517 16.4962C25.5715 16.3764 25.6388 16.2139 25.6388 16.0444C25.6388 15.875 25.5715 15.7125 25.4517 15.5927C25.3319 15.4729 25.1694 15.4055 25 15.4055H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path></svg>
            </div>
            <div class="post_info_date">
              <p>{{ post.date }}</p>
              <p>{{ post.time }}</p>
            </div>
          </div>
        </div>
        <div class="post_text">
          <p class="post_title">{{post.title}}</p>
          <p class="post_previewText">{{post.previewText}}</p>
        </div>
      </router-link>
      <div v-if="authStore.data.auth" class="post_actions DF">
        <div class="post_actions-favorite"
          :class="objCurrentUser.user ? objCurrentUser.user.account.favorites.includes(post.id) ? 'post_favorite_active' :  '' : ''"
          @click="handlerFavorite" :id="post.id">
        </div>
        <div class="post_actions-check" 
          :class="objCurrentUser.user ? objCurrentUser.user.account.viewed.includes(post.id) ? 'post_favorite_check' :  '' : ''"
          @click="handlerCheck" :id="post.id">
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
  <ModalAddPost 
    @closeModal="(close) => objModal.addWorkModal = close"
    :activeModal="objModal.activeModal"/>
</template>