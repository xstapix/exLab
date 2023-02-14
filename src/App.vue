<script setup>
  import { onBeforeMount } from 'vue';
  import { useAuthStore } from '@/stores/authStore' 
  import {getMethods} from '@/methods.js'

  onBeforeMount( () => {
    const authStore = useAuthStore()
    const useMethod = getMethods()

    async function setUser() {
      const user = await useMethod.getAuth()
      
      authStore.changeUser(user)
      authStore.changeAuth(true)
    }

    if(getCookie('cronaClubUserEmail')){
      setUser()
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
