<script setup>
  import { onBeforeMount } from 'vue';
  import { useAuthStore } from '@/stores/authStore' 
  import {getMethods} from '@/methods.js'

  onBeforeMount( () => {
    const authStore = useAuthStore()
    const cookies = document.cookie.split(';')
    const useMethod = getMethods()

    async function setUser() {
      const user = await useMethod.getAuth()
      authStore.changeUser(user[0])
    }

    for (let index in cookies) {
      let line = cookies[index].split('=')
      let lineCopy = line[0].split('')
      lineCopy.shift()

      if(lineCopy.join('') === 'cronaClubUserEmail'){
        authStore.changeAuth(true)
        setUser()
      }
    }
  })
</script>
<template>
  <router-view></router-view>
</template>
