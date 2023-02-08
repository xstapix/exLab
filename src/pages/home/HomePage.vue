<script setup>
  import Filter from '@/components/tagFilter/Filter.vue'
  import TheSideBar from '@/components/sideBar/TheSideBar.vue'

  import {defineAsyncComponent} from 'vue'
  
  import './style.css'

  const PostsList = defineAsyncComponent(
    () => import('@/components/list/PostsList.vue')
  )
  
  document.body.style.backgroundColor = '#000'

</script>
<template lang="">
  <div class="DF">
    <TheSideBar/>
    <PostsList/>
    <Filter/>
  </div>
</template>
