<script setup>
  import TheSideBar from '@/components/sideBar/TheSideBar.vue'
  import {getMethods} from '@/methods.js'
  import { useAuthStore } from '@/stores/authStore' 
  
  import {reactive} from 'vue'
  import { useRouter } from 'vue-router'

  import './style.css'

  const useMethod = getMethods()
  const authStore = useAuthStore()
  const router = useRouter()

  document.body.style.backgroundColor = '#000'

  if (!authStore.data.auth) {
    router.push('/login')
  }

  const state = reactive({
    users: [],
    activeSelect: false
  })

  setState()


  async function setState() {
    const allUsers = await useMethod.getUsers()
    state.users = allUsers
  }
</script>
<template>
  <div class="DF">
    <TheSideBar/>
    <section class="users_body">
      <div class="stark_rating DF AIC">
        <p class="stark_rating-text">Pейтинг старков</p>
        <div class="stark_rating-select DF AIC" @click="state.activeSelect = !state.activeSelect">
          <p class="stark_rating-select_text">За месяц</p>
          <div :class="state.activeSelect ? 'stark_rating-select_arrowActive_down' :  'stark_rating-select_arrow_down'"></div>
          <div :class="state.activeSelect ? 'stark_rating-selectActive_options' : 'stark_rating-select_options'">
            <p class="stark_rating-select_text">За месяц</p>
            <p class="text_options_margin">За все время</p>
          </div>
        </div>
      </div>
      <table class="users_body-table">
        <thead>
          <tr>
            <th></th>
            <th>Название аккаунта</th>
            <th>Звезды</th>
            <th>Уровень</th>
            <th>В клубе</th>
            <th>База старка</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in state.users" :key="item.id">
            <td>
              <div class="DF AIC">
                <div class="table_account_avatar">
                  <img class="table_account_avatar-img" src="/yyhqfinwoon1yvcb6hm7jam67nnus0ec.png" alt="" srcset="">
                </div>
                <div class="table_account_text">
                  <p class="table_account_text-name">{{item.account.name}}</p>
                  <p class="table_account_text-which_stark">{{ item.stark }}</p>
                </div>
              </div>
            </td>
            <td>
              <div class="DF AIC">
                <div class="table_star">
                </div>
                <p class="table_star-text">{{ item.star }}</p>
              </div>
            </td>
            <td>
              <div class="DF AIC">
                <div class="table_star">
                </div>
                <p class="table_star-text">{{ item.level }}</p>
              </div>
            </td>
            <td>
              <div class="DF AIC">
                <div class="table_star">
                </div>
                <p class="table_star-text">{{ item.inClub }}</p>
              </div>
            </td>
            <td>
              <div class="table_location DF AIC">
                <div class="table_star">
                </div>
                <p class="table_location-text">{{ item.base }}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>