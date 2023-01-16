<script setup>
  import {useStore} from '@/stores/postStore'
  import './style.css'

  const postsStore = useStore()
</script>

<template>
  <div v-if="postsStore.data.posts" class="postsBody">
    <div v-for="post in postsStore.data.posts" class="post">
      <p class="post_title">{{post.title}}</p>
      <p class="post_previewText">{{post.previewText}}</p>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>