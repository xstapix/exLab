<script setup>
  import SideBar from '@/components/SideBar/SideBar.vue'
  import {getMethods} from '@/methods.js'
  import { useAuthStore } from '@/stores/authStore' 

  import { reactive } from 'vue';
  import { useRouter } from 'vue-router'

  import './style.css'
  import './media-style.css'
  
  const useMethod = getMethods()
  const authStore = useAuthStore()
  const router = useRouter()

  const objAuthInfo = reactive({
    email: null,
    password: null
  })

  const objValidation = reactive({
    errValidation: false
  })

  async function handleLogin() {
    const auth = await useMethod.getAuth(objAuthInfo.email, objAuthInfo.password)

    if (auth.success_login) {
      authStore.changeAuth(true)
      authStore.changeUser(auth)
      objValidation.errValidation = false

      let saveUp = new Date()
      saveUp.setFullYear(saveUp.getFullYear() + 1)

      setCookie('__upi_cronaClubUserEmail', objAuthInfo.email, {
        expires: saveUp
      });

      router.push('/')
    } else {
      authStore.changeAuth(false)
      objValidation.errValidation = true
      console.log(auth);
    }
  }


  function setCookie(name, value, options = {}) {
    options = {
      ...options
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }
</script>

<template>
  <div class="DF background_space">
    <SideBar/>
    <div class="login_body">
      <h1 class="login_body-text">Вход во вселенную закрытого клуба дизайнеров «1000 звёзд»</h1>
      <div class="login_body-form">
        <div v-if="objValidation.errValidation" class="login_body-form_errValidation">Неверный логин или пароль.</div>
        <div class="login_body-form_field">
          <p class="login_body-form_field_title">Ваш email</p>
          <input v-model="objAuthInfo.email" type="email" class="login_body-form_field_input">
        </div>
        <div class="login_body-form_field">
          <p class="login_body-form_field_title">Ваш пароль</p>
          <input v-model="objAuthInfo.password" type="password" class="login_body-form_field_input">
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