<script setup>
  import { onBeforeMount } from 'vue';
  import { useAuthStore } from '@/stores/authStore' 

  onBeforeMount(() => {
    const authStore = useAuthStore()
    const cookies = document.cookie.split(';')

    for (let index in cookies) {
      let line = cookies[index].split('=')
      let lineCopy = line[0].split('')
      lineCopy.shift()
      if(lineCopy.join('') === 'cronaClubUserEmail'){
        authStore.changeAuth(true)
      }
    }
  })
</script>
<template>
  <router-view></router-view>
</template>
