<script setup>
  import SideBar from '@/components/SideBar/SideBar.vue'
  import {getMethods} from '@/methods.js'
  import { useAuthStore } from '@/stores/authStore' 
  import { useUserStore } from '@/stores/userStore' 
  import { useWindowSizeStore } from '@/stores/windowSizeStore' 

  import VButtonShowMore from '@/components/VButtonShowMore/VButtonShowMore.vue'
  
  import {reactive} from 'vue'
  import { useRouter } from 'vue-router'

  import './style.css'
  import './media-style.css'

  const useMethod = getMethods()
  const router = useRouter()
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const windowSizeStore = useWindowSizeStore()
  
  const objUsers = reactive({
    users: [],
  })

  const objSelect = reactive({
    activeSelect: false,
  })
  
  const objParamsPage = reactive({
    selectedPeriod: 'month',
    page: 1,
    idLastUser: 0
  })

  const odjSortArrow = reactive({
    starArrow: false,
    levelArrow: false,
    inClubArrow: false
  })

  setState()

  async function setState() {
    objUsers.users = await useMethod.getUsers()
  }

  const handlerSort = (sortBy) => {
    switch (sortBy) {
      case 'star':
        objUsers.users.sort((a, b) => {return a.star - b.star})
        odjSortArrow.starArrow = true
        odjSortArrow.levelArrow = false
        odjSortArrow.inClubArrow = false
        break;
      case 'level':
        objUsers.users.sort((a, b) => {return a.level - b.level})
        odjSortArrow.starArrow = false
        odjSortArrow.levelArrow = true
        odjSortArrow.inClubArrow = false
        break;
    
      default:
        objUsers.users.sort((a, b) => {return a.inClub - b.inClub})
        odjSortArrow.starArrow = false
        odjSortArrow.levelArrow = false
        odjSortArrow.inClubArrow = true
        break;
    }
  }

  async function handlerSelectText() {
    if (objParamsPage.selectedPeriod === 'month') {
      objParamsPage.selectedPeriod = 'all'
    } else objParamsPage.selectedPeriod = 'month'

    await useMethod.getUsers(objParamsPage)
  }

  async function handlerShowMore() {
    objParamsPage.page++
    objParamsPage.idLastUser = userStore.data.users[userStore.data.users.length - 1].id
    await useMethod.getUsers(objParamsPage)
  }

</script>
<template>
  <div class="DF">
    <SideBar/>
    <section class="users_body">
      <div class="stark_rating DF AIC">
        <p class="stark_rating-text">Pейтинг старков</p>
        <div class="stark_rating-select DF AIC" @click="objSelect.activeSelect = !objSelect.activeSelect">
          <p class="stark_rating-select_text">{{ objParamsPage.selectedPeriod == 'month' ? 'За месяц' : 'За все время' }}</p>
          <div :class="objSelect.activeSelect ? 'stark_rating-select_arrow_down' :  'stark_rating-select_arrow_up'"></div>
          <div v-if="objSelect.activeSelect" class="stark_rating-selectActive_options">
            <p class="stark_rating-select_text" @click="handlerSelectText">За месяц</p>
            <p class="stark_rating-select_text text_options_margin" @click="handlerSelectText">За все время</p>
          </div>
        </div>
      </div>
      <div v-if="windowSizeStore.objAdaptive.currentSize > 1500" class="table_head DF AIC">
        <div class="table_head-item"></div>
        <div class="table_head-item"></div>
        <div class="table_head-item">Название аккаунта</div>
        <div class="DF AIC table_head-item" @click="handlerSort('star')">
          <div class="table-head-title">Звезды</div>
          <div :class="odjSortArrow.starArrow ? 'stark_rating-select_arrow_up' : 'stark_rating-select_arrow_down'"></div>
        </div>
        <div class="DF AIC table_head-item" @click="handlerSort('star')">
          <div class="table-head-title">Уровень</div>
          <div :class="odjSortArrow.starArrow ? 'stark_rating-select_arrow_up' : 'stark_rating-select_arrow_down'"></div>
        </div>
        <div class="DF AIC table_head-item" @click="handlerSort('star')">
          <div class="table-head-title">В клубе</div>
          <div :class="odjSortArrow.starArrow ? 'stark_rating-select_arrow_up' : 'stark_rating-select_arrow_down'"></div>
        </div>
        <div class="table_head-item">База старка</div>
      </div>
        
      <div class="table_body DF AIC">
        <div class="table_body-num">1</div>
        <a href="#" class="table_body-img">
          <img src="https://kronadev.ru/local/templates/kronaclub/build/img/avatar2.png" alt="">
        </a>
        <div class="table_body-name">
          <a href="" class="table_body-name_text">v.sarafannikov</a>
          <div class="table_body-name_stark">ультрамариновый старк</div>
        </div>
        <div class="table_body-info DF">
          <div class="table_body-data DF AIC">
            <div class="table_body-data_img">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="white"></circle><path d="M15.3283 10.1682C15.7195 9.5382 16.6362 9.5382 17.0274 10.1682L18.4351 12.4351C18.5727 12.6567 18.7914 12.8158 19.0446 12.8784L21.6348 13.5188C22.3538 13.6966 22.6367 14.567 22.1598 15.1336L20.4389 17.1777C20.2712 17.377 20.1878 17.6338 20.2065 17.8936L20.3987 20.5589C20.452 21.2981 19.7106 21.8364 19.0242 21.5569L16.5549 20.5515C16.3132 20.4531 16.0425 20.4531 15.8007 20.5515L13.3315 21.5569C12.645 21.8364 11.9037 21.2981 11.957 20.5589L12.1491 17.8936C12.1678 17.6338 12.0845 17.377 11.9167 17.1777L10.1959 15.1336C9.71891 14.567 10.0019 13.6966 10.7209 13.5188L13.3111 12.8784C13.5643 12.8158 13.783 12.6567 13.9206 12.4351L15.3283 10.1682Z" fill="#262626"></path></svg>
            </div>
            <div class="table_body-data_text">16</div>
          </div>
          <div class="table_body-data DF AIC">
            <div class="table_body-data_img">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="white"></circle><path d="M12.3341 11.0661V19H10.6838V11.0661H12.3341ZM18.6582 13.0496L16.5778 19H14.7183L12.638 13.0496H14.3813L15.6171 17.3071H15.6791L16.911 13.0496H18.6582ZM20.6075 11.0661V19H18.9572V11.0661H20.6075ZM22.3487 19.1007C22.093 19.1007 21.8735 19.0103 21.6901 18.8295C21.5093 18.6462 21.4189 18.4267 21.4189 18.171C21.4189 17.9179 21.5093 17.7009 21.6901 17.5201C21.8735 17.3394 22.093 17.249 22.3487 17.249C22.5966 17.249 22.8136 17.3394 22.9995 17.5201C23.1855 17.7009 23.2784 17.9179 23.2784 18.171C23.2784 18.3414 23.2345 18.4977 23.1467 18.6397C23.0615 18.7792 22.9492 18.8915 22.8097 18.9768C22.6702 19.0594 22.5166 19.1007 22.3487 19.1007Z" fill="#262626"></path></svg>
            </div>
            <div class="table_body-data_text">16</div>
          </div>
          <div class="table_body-data body-data_margin-fix DF AIC">
          <div class="table_body-data_img">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="white"></circle><path d="M12 11.4688C12 11.21 12.224 11 12.5 11H19.5C19.7771 11 20 11.21 20 11.4688C20 11.7275 19.7771 11.9375 19.5 11.9375H19.3333V12.3082C19.3333 13.0957 18.9813 13.834 18.4062 14.4082L16.7063 16L18.4062 17.5918C18.9813 18.1484 19.3333 18.9043 19.3333 19.6914V20.0625H19.5C19.7771 20.0625 20 20.2715 20 20.5312C20 20.791 19.7771 21 19.5 21H12.5C12.224 21 12 20.791 12 20.5312C12 20.2715 12.224 20.0625 12.5 20.0625H12.6667V19.6914C12.6667 18.9043 13.0002 18.1484 13.5942 17.5918L15.2938 16L13.5942 14.4082C13.0002 13.834 12.6667 13.0957 12.6667 12.3082V11.9375H12.5C12.224 11.9375 12 11.7275 12 11.4688ZM14.0788 18.5H17.9208C17.8542 18.4141 17.7792 18.332 17.6979 18.2559L16 16.6621L14.3021 18.2559C14.2208 18.332 14.1271 18.4141 14.0788 18.5ZM17.9208 13.5C18.1688 13.1562 18.3333 12.7389 18.3333 12.3082V11.9375H13.6667V12.3082C13.6667 12.7389 13.8125 13.1562 14.0788 13.5H17.9208Z" fill="#262626"></path></svg>
          </div>
          <div class="table_body-data_text">16</div>
        </div>
        </div>
        <div v-if="windowSizeStore.objAdaptive.currentSize > 1500" class="table_body-data_local DF AIC">
          <div class="table_body-data_img">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M20 20.7461C21.103 20.7461 22 19.8491 22 18.7461C22 17.6431 21.103 16.7461 20 16.7461C18.897 16.7461 18 17.6431 18 18.7461C18 19.8491 18.897 20.7461 20 20.7461ZM20 17.7461C20.5515 17.7461 21 18.1946 21 18.7461C21 19.2976 20.5515 19.7461 20 19.7461C19.4485 19.7461 19 19.2976 19 18.7461C19 18.1946 19.4485 17.7461 20 17.7461Z" fill="black"></path><path d="M20 17.7461C20.5515 17.7461 21 18.1946 21 18.7461C21 19.2976 20.5515 19.7461 20 19.7461C19.4485 19.7461 19 19.2976 19 18.7461C19 18.1946 19.4485 17.7461 20 17.7461Z" fill="black"></path><path d="M19.565 27.6067C19.6919 27.6974 19.844 27.7461 20 27.7461C20.156 27.7461 20.3081 27.6974 20.435 27.6067C20.663 27.4455 26.0217 23.5762 25.9999 18.7461C25.9999 15.4379 23.3082 12.7461 20 12.7461C16.6918 12.7461 14.0001 15.4379 14.0001 18.7424C13.9783 23.5762 19.337 27.4455 19.565 27.6067ZM20 14.2461C22.4817 14.2461 24.5 16.2644 24.5 18.7499C24.5157 22.0784 21.209 25.0672 20 26.0475C18.7918 25.0664 15.4843 22.0769 15.5 18.7461C15.5 16.2644 17.5183 14.2461 20 14.2461Z" fill="black"></path></svg>
          </div>
          <div class="table_body-data_local_text">Казахстан/Алматы</div>
        </div>
        <div class="table_body-data_works DF AIC">
          <div v-if="windowSizeStore.objAdaptive.currentSize > 1130" class="DF AIC">
            <a href="#" 
              class="table_body-data_works_preview"
              :style="{backgroundImage: `url('https://kronadev.ru/upload/resize_cache/iblock/d46/500_500_2/usnz4na8cb4wckn52kk7t1hn8mq29g4u.jpg')`}"></a>
            <a href="#" 
            class="table_body-data_works_preview"
            :style="{backgroundImage: `url('https://kronadev.ru/upload/resize_cache/iblock/d46/500_500_2/usnz4na8cb4wckn52kk7t1hn8mq29g4u.jpg')`}"></a>
            <a href="#" 
            class="table_body-data_works_preview"
            :style="{backgroundImage: `url('https://kronadev.ru/upload/resize_cache/iblock/d46/500_500_2/usnz4na8cb4wckn52kk7t1hn8mq29g4u.jpg')`}"></a>
            <a href="#" 
            class="table_body-data_works_preview"
            :style="{backgroundImage: `url('https://kronadev.ru/upload/resize_cache/iblock/d46/500_500_2/usnz4na8cb4wckn52kk7t1hn8mq29g4u.jpg')`}"></a>
          </div>
          <a href="#" 
            class="table_body-data_works_more DF AIC JCC">
            <div>+8</div>
            <div>работ</div>
          </a>  
        </div>
      </div>
      <div class="table_body DF AIC">
        <div class="table_body-num">1</div>
        <a href="#" class="table_body-img">
          <img src="https://kronadev.ru/local/templates/kronaclub/build/img/avatar2.png" alt="">
        </a>
        <div class="table_body-name">
          <a href="" class="table_body-name_text">v.sarafannikov</a>
          <div class="table_body-name_stark">ультрамариновый старк</div>
        </div>
        <div class="table_body-info DF">
          <div class="table_body-data DF AIC">
            <div class="table_body-data_img">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="white"></circle><path d="M15.3283 10.1682C15.7195 9.5382 16.6362 9.5382 17.0274 10.1682L18.4351 12.4351C18.5727 12.6567 18.7914 12.8158 19.0446 12.8784L21.6348 13.5188C22.3538 13.6966 22.6367 14.567 22.1598 15.1336L20.4389 17.1777C20.2712 17.377 20.1878 17.6338 20.2065 17.8936L20.3987 20.5589C20.452 21.2981 19.7106 21.8364 19.0242 21.5569L16.5549 20.5515C16.3132 20.4531 16.0425 20.4531 15.8007 20.5515L13.3315 21.5569C12.645 21.8364 11.9037 21.2981 11.957 20.5589L12.1491 17.8936C12.1678 17.6338 12.0845 17.377 11.9167 17.1777L10.1959 15.1336C9.71891 14.567 10.0019 13.6966 10.7209 13.5188L13.3111 12.8784C13.5643 12.8158 13.783 12.6567 13.9206 12.4351L15.3283 10.1682Z" fill="#262626"></path></svg>
            </div>
            <div class="table_body-data_text">16</div>
          </div>
          <div class="table_body-data DF AIC">
            <div class="table_body-data_img">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="white"></circle><path d="M12.3341 11.0661V19H10.6838V11.0661H12.3341ZM18.6582 13.0496L16.5778 19H14.7183L12.638 13.0496H14.3813L15.6171 17.3071H15.6791L16.911 13.0496H18.6582ZM20.6075 11.0661V19H18.9572V11.0661H20.6075ZM22.3487 19.1007C22.093 19.1007 21.8735 19.0103 21.6901 18.8295C21.5093 18.6462 21.4189 18.4267 21.4189 18.171C21.4189 17.9179 21.5093 17.7009 21.6901 17.5201C21.8735 17.3394 22.093 17.249 22.3487 17.249C22.5966 17.249 22.8136 17.3394 22.9995 17.5201C23.1855 17.7009 23.2784 17.9179 23.2784 18.171C23.2784 18.3414 23.2345 18.4977 23.1467 18.6397C23.0615 18.7792 22.9492 18.8915 22.8097 18.9768C22.6702 19.0594 22.5166 19.1007 22.3487 19.1007Z" fill="#262626"></path></svg>
            </div>
            <div class="table_body-data_text">16</div>
          </div>
          <div class="table_body-data body-data_margin-fix DF AIC">
          <div class="table_body-data_img">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="white"></circle><path d="M12 11.4688C12 11.21 12.224 11 12.5 11H19.5C19.7771 11 20 11.21 20 11.4688C20 11.7275 19.7771 11.9375 19.5 11.9375H19.3333V12.3082C19.3333 13.0957 18.9813 13.834 18.4062 14.4082L16.7063 16L18.4062 17.5918C18.9813 18.1484 19.3333 18.9043 19.3333 19.6914V20.0625H19.5C19.7771 20.0625 20 20.2715 20 20.5312C20 20.791 19.7771 21 19.5 21H12.5C12.224 21 12 20.791 12 20.5312C12 20.2715 12.224 20.0625 12.5 20.0625H12.6667V19.6914C12.6667 18.9043 13.0002 18.1484 13.5942 17.5918L15.2938 16L13.5942 14.4082C13.0002 13.834 12.6667 13.0957 12.6667 12.3082V11.9375H12.5C12.224 11.9375 12 11.7275 12 11.4688ZM14.0788 18.5H17.9208C17.8542 18.4141 17.7792 18.332 17.6979 18.2559L16 16.6621L14.3021 18.2559C14.2208 18.332 14.1271 18.4141 14.0788 18.5ZM17.9208 13.5C18.1688 13.1562 18.3333 12.7389 18.3333 12.3082V11.9375H13.6667V12.3082C13.6667 12.7389 13.8125 13.1562 14.0788 13.5H17.9208Z" fill="#262626"></path></svg>
          </div>
          <div class="table_body-data_text">16</div>
        </div>
        </div>
        <div v-if="windowSizeStore.objAdaptive.currentSize > 1500" class="table_body-data_local DF AIC">
          <div class="table_body-data_img">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M20 20.7461C21.103 20.7461 22 19.8491 22 18.7461C22 17.6431 21.103 16.7461 20 16.7461C18.897 16.7461 18 17.6431 18 18.7461C18 19.8491 18.897 20.7461 20 20.7461ZM20 17.7461C20.5515 17.7461 21 18.1946 21 18.7461C21 19.2976 20.5515 19.7461 20 19.7461C19.4485 19.7461 19 19.2976 19 18.7461C19 18.1946 19.4485 17.7461 20 17.7461Z" fill="black"></path><path d="M20 17.7461C20.5515 17.7461 21 18.1946 21 18.7461C21 19.2976 20.5515 19.7461 20 19.7461C19.4485 19.7461 19 19.2976 19 18.7461C19 18.1946 19.4485 17.7461 20 17.7461Z" fill="black"></path><path d="M19.565 27.6067C19.6919 27.6974 19.844 27.7461 20 27.7461C20.156 27.7461 20.3081 27.6974 20.435 27.6067C20.663 27.4455 26.0217 23.5762 25.9999 18.7461C25.9999 15.4379 23.3082 12.7461 20 12.7461C16.6918 12.7461 14.0001 15.4379 14.0001 18.7424C13.9783 23.5762 19.337 27.4455 19.565 27.6067ZM20 14.2461C22.4817 14.2461 24.5 16.2644 24.5 18.7499C24.5157 22.0784 21.209 25.0672 20 26.0475C18.7918 25.0664 15.4843 22.0769 15.5 18.7461C15.5 16.2644 17.5183 14.2461 20 14.2461Z" fill="black"></path></svg>
          </div>
          <div class="table_body-data_local_text">Казахстан/Алматы</div>
        </div>
        <div class="table_body-data_works DF AIC">
          <div v-if="windowSizeStore.objAdaptive.currentSize > 1130" class="DF AIC">
            <a href="#" 
              class="table_body-data_works_preview"
              :style="{backgroundImage: `url('https://kronadev.ru/upload/resize_cache/iblock/d46/500_500_2/usnz4na8cb4wckn52kk7t1hn8mq29g4u.jpg')`}"></a>
            <a href="#" 
            class="table_body-data_works_preview"
            :style="{backgroundImage: `url('https://kronadev.ru/upload/resize_cache/iblock/d46/500_500_2/usnz4na8cb4wckn52kk7t1hn8mq29g4u.jpg')`}"></a>
            <a href="#" 
            class="table_body-data_works_preview"
            :style="{backgroundImage: `url('https://kronadev.ru/upload/resize_cache/iblock/d46/500_500_2/usnz4na8cb4wckn52kk7t1hn8mq29g4u.jpg')`}"></a>
            <a href="#" 
            class="table_body-data_works_preview"
            :style="{backgroundImage: `url('https://kronadev.ru/upload/resize_cache/iblock/d46/500_500_2/usnz4na8cb4wckn52kk7t1hn8mq29g4u.jpg')`}"></a>
          </div>
          <a href="#" 
            class="table_body-data_works_more DF AIC JCC">
            <div>+8</div>
            <div>работ</div>
          </a>  
        </div>
      </div>
      <VButtonShowMore @click="handlerShowMore"/>
    </section>
  </div>
</template>