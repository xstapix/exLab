<script setup>
  import {usePostStore} from '@/stores/postStore'
  import './style.css'
  import PostsList from '@/components/list/PostsList.vue'
  import Filter from '@/components/tagFilter/Filter.vue'
  
  const postsStore = usePostStore()

</script>
<template lang="">
  <div class="DF">
    <PostsList/>
    <Filter/>
  </div>
</template>
