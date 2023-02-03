<script setup>
  import TheSideBar from '@/components/sideBar/TheSideBar.vue'
  import { useAuthStore } from '@/stores/authStore'
  import {getMethods} from '@/methods.js'

  import { useRouter } from 'vue-router'

  import { reactive, watch } from 'vue';

  import './style.css'

  const authStore = useAuthStore()
  const router = useRouter()
  const useMethod = getMethods()

  if (!authStore.data.auth) {
    router.push('/login')
  }
  
  document.body.style.backgroundColor = '#000'

  const objNav = reactive({
    portfolio: true, 
    satellites: false,
    yourData: false
  })

  const objAuth = reactive({
    user: authStore.data.user
  })

  const odjButton = reactive({
    buttonActive: false
  })

  const handlerNav = (li) => {
    if (li.target.id === 'portfolio') {
      objNav.portfolio = true, 
      objNav.satellites = false,
      objNav.yourData = false
    } else if(li.target.id === 'satellites') {
      objNav.portfolio = false, 
      objNav.satellites = true,
      objNav.yourData = false
    } else {
      objNav.portfolio = false, 
      objNav.satellites = false,
      objNav.yourData = true
    }
  }

  watch(objAuth.user, () => {
    odjButton.buttonActive = true
  })

  const handlerSave = async () => {
    let formData = new FormData()

    formData.append('method', 'sendTest')
    formData.append('user', objAuth.user)

    authStore.changeUser(objAuth.user)

    odjButton.buttonActive = false

    await useMethod.postWork(formData)
      .then((res) => console.log(res))
      .catch((rej) => console.log(rej))
  }

</script>

<template>
  <div class="DF">
    <TheSideBar/>
    <div class="profile_preview"></div>
    <div class="profile_info">
      <nav class="profile_info-nav">
        <ul class="DF">
          <li @click="handlerNav" 
            class="profile_info-nav-paragraph" 
            id="portfolio"
            :class="objNav.portfolio ? 'paragraph_active' : ''">Открытое портфолио</li>
          <li @click="handlerNav" 
            class="profile_info-nav-paragraph"
            id="satellites"
            :class="objNav.satellites ? 'paragraph_active' : ''">Ваши спутники</li>
          <li @click="handlerNav" 
            class="profile_info-nav-paragraph"
            id="yourData"
            :class="objNav.yourData ? 'paragraph_active' : ''">Данные</li>
        </ul>
      </nav>
      <div :class="objNav.yourData ? 'DF' : 'DN'">
        <div class="info-yourData_block">
          <div class="info-yourData_block_item">
            <p class="item-texts">Имя</p>
            <input type="text" v-model="objAuth.user.account.name" class="item-input">
          </div>
          <button @click="handlerSave" :class="odjButton.buttonActive ? 'info-yourData_save' : 'DN'">Сохранить изменения</button>
        </div>
        <div class="info-yourData_block">
          <div class="info-yourData_block_item">
            <p class="item-texts">Ваш telegram-аккаунт</p>
            <input type="text" class="item-input">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>