<script setup>
  import {useStore} from '@/stores/postStore'
  import { useAuthStore } from '@/stores/authStore'

  import {watch, reactive} from 'vue'

  import './style.css'

  const postsStore = useStore()
  const authStore = useAuthStore()

  const state = reactive({
    user: authStore.data.user
  })

  watch(authStore.data, (newUser) => {
    state.user = newUser.user;
  })

  const handlerFavorite = (e) => {
    if (e.target.classList.length === 2) {
      for (let index = 0; index < state.user.account.favorites.length; index++) {
        if (state.user.account.favorites[index] == e.target.id) {
          state.user.account.favorites.splice(index, 1)
          break
        }
      }
    } else state.user.account.favorites.push(Number(e.target.id))
  } 

  const handlerCheck = (e) => {
    if (e.target.classList.length === 2) {
      for (let index = 0; index < state.user.account.viewed.length; index++) {
        if (state.user.account.viewed[index] == e.target.id) {
          state.user.account.viewed.splice(index, 1)
          break
        }
      }
    } else state.user.account.viewed.push(Number(e.target.id))
  }

 </script>

<template>
  <div v-if="postsStore.data.posts" class="postsBody"> 
    <div v-for="post in postsStore.data.posts" class="post DF" 
      :class="state.user ? state.user.account.viewed.includes(post.id) ? 'post_checked' :  '' : ''">
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
              <p>{{ post.minutes }}</p>
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
          :class="state.user ? state.user.account.favorites.includes(post.id) ? 'post_favorite_active' :  '' : ''"
          @click="handlerFavorite" :id="post.id">
        </div>
        <div class="post_actions-check" 
          :class="state.user ? state.user.account.viewed.includes(post.id) ? 'post_favorite_check' :  '' : ''"
          @click="handlerCheck" :id="post.id">
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>