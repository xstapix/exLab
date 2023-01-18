<script setup>
  import './style.css'
  import PostsList from '@/components/list/PostsList.vue'
  import Filter from '@/components/tagFilter/Filter.vue'
  import SideBar from '@/components/sideBar/SideBar.vue'

</script>
<template lang="">
  <div class="DF">
    <SideBar/>
    <PostsList/>
    <Filter/>
  </div>
</template>
