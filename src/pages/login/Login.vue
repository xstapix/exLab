<script setup>
  import TheSideBar from '@/components/sideBar/TheSideBar.vue'
  import {getMethods} from '@/methods.js'
  import { useAuthStore } from '@/stores/authStore' 

  import { reactive } from 'vue';
  import { useRouter } from 'vue-router'

  import './style.css'
  
  const useMethod = getMethods()
  const authStore = useAuthStore()
  const router = useRouter()

  const state = reactive({
    email: null,
    password: null
  })

  async function handleLogin() {
    const auth = await useMethod.getAuth()

    if (auth.account.email === state.email && auth.account.password === state.password) {
      authStore.changeAuth(true)
      authStore.changeUser(auth)
      document.cookie = `cronaClubUserEmail=${state.email}`
      document.cookie = `cronaClubUserPassword=${state.password}`
      router.push('/')
    } else {
      authStore.changeAuth(false)
    }
  }
</script>

<template>
  <div class="DF background_space">
    <TheSideBar/>
    <div class="login_body">
      <h1 class="login_body-text">Вход во вселенную закрытого клуба дизайнеров «1000 звёзд»</h1>
      <div class="login_body-form">
        <div class="login_body-form_field">
          <p class="login_body-form_field_title">Ваш email</p>
          <input v-model="state.email" type="email" class="login_body-form_field_input">
        </div>
        <div class="login_body-form_field">
          <p class="login_body-form_field_title">Ваш пароль</p>
          <input v-model="state.password" type="password" class="login_body-form_field_input">
        </div>
        <button class="login_body-form_button" @click="handleLogin">Войти</button>
        <div class="login_body-form_offert">Нажимая на кнопку «Войти» вы соглашаетесь с <a href="https://drive.google.com/file/d/1XpdivgLw8zeZymkKffI33vxb15GziuKu/view" target="_blank">договором оферты и даете согласие на обработку персональных данных</a></div>
      </div>
      <div class="login_body-register">
        <div class="login_body-register_text">
          Если у вас нет аккаунта, то вы можете записаться в клуб на официальном сайте
        </div>
        <a href="/" class="login_body-register_button">Перейти на сайт</a>
      </div>
    </div>
  </div>
</template>