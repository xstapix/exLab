<script setup>
  import { onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router'

  import { getAuthStore } from '@/stores/AuthStore' 
  import { getApi } from '@/API/api.js'

  onBeforeMount( () => {
    const authStore = getAuthStore()
    const useApi = getApi()
    const router = useRouter()

    setUser()
    
    async function setUser() {
      let currentEmail = getCookie('__upi_cronaClubUserEmail')

      if (currentEmail) {
        const user = await useApi.getAuth(currentEmail, null)
        
        authStore.changeUser(user)
        authStore.changeAuth(true)
      } else {
        if (router.currentRoute.value.fullPath === '/') {
          router.push('/')
        } else {
          router.push('/login')
        }
      }
    }

    function getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
  })
</script>

<template>
  <router-view></router-view>
</template>
