<script setup>
  import {useStore} from '@/stores/postStore'
  import {reactive} from 'vue'

  import './style.css'
  
  const postsStore = useStore()
  const state = reactive({
    id: postsStore.data.posts[this.$route.params.id].title
  })

  console.log(state.id);
</script>

<template>
  <div>
  </div>
</template>