<script setup>
  import { onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router'

  import { useAuthStore } from '@/stores/authStore' 
  import {getMethods} from '@/methods.js'

  onBeforeMount( () => {
    const authStore = useAuthStore()
    const useMethod = getMethods()
    const router = useRouter()

    setUser()
    
    async function setUser() {
      let currentEmail = getCookie('__upi_cronaClubUserEmail')

      if (currentEmail) {
        const user = await useMethod.getAuth(currentEmail, null)
        
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
