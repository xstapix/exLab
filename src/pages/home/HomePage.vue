<script setup>
  import PostsList from '@/components/list/PostsList.vue'
  import Filter from '@/components/tagFilter/Filter.vue'
  import SideBar from '@/components/sideBar/SideBar.vue'
  
  import './style.css'
  
  document.body.style.backgroundColor = '#000'

</script>
<template lang="">
  <div class="DF">
    <SideBar/>
    <PostsList/>
    <Filter/>
  </div>
</template>
