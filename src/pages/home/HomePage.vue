<script setup>
  import PostsList from '@/components/list/PostsList.vue'
  import Filter from '@/components/tagFilter/Filter.vue'
  import TheSideBar from '@/components/sideBar/TheSideBar.vue'
  
  import './style.css'
  
  document.body.style.backgroundColor = '#000'

</script>
<template lang="">
  <div class="DF">
    <TheSideBar/>
    <PostsList/>
    <Filter/>
  </div>
</template>
