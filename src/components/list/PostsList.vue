<script setup>
  import axios from 'axios';
  
  import {usePostStore} from '@/stores/postStore'
  import './style.css'

  const postsStore = usePostStore()

  axios.get('https://63385f16937ea77bfdbf1257.mockapi.io/kronaPostsList')
    .then((res) => postsStore.posts = res.data)
    .catch((err) => console.error('Get Error', err))
</script>

<template>
  <div v-if="postsStore.posts" class="postsBody">
    <div v-for="post in postsStore.posts" class="post">
      <p class="post_title">{{post.title}}</p>
      <p class="post_previewText">{{post.previewText}}</p>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>