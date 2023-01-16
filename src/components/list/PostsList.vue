<script setup>
  import {usePostStore} from '@/stores/postStore'
  import './style.css'

  const postsStore = usePostStore()

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