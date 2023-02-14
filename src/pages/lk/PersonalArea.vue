<script setup>
  import TheSideBar from '@/components/sideBar/TheSideBar.vue'
  import { useAuthStore } from '@/stores/authStore'
  import {getMethods} from '@/methods.js'

  import { useRouter } from 'vue-router'

  import { reactive, watch, defineAsyncComponent } from 'vue';

  import './style.css'
  import '@/components/materials/style.css'
  
  const ModalAddMaterial = defineAsyncComponent(
    () => import('@/components/modalAddMaterial/ModalAddMaterial.vue')
  )

  const authStore = useAuthStore()
  const router = useRouter()
  const useMethod = getMethods()

  // if (!authStore.data.auth) {
  //   router.push('/login')
  // }
  
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

  const objModal = reactive({
    activeModalAddPost: false
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

    await useMethod.sendWork(formData)
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
      <div :class="objNav.satellites ? 'DF' : 'DN'">
        <div class="satellites-body">
          <div class="add_post">
            <div class="add_post-tip DF">
              +3
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.15129 1.0843C6.54247 0.454335 7.45918 0.454335 7.85036 1.0843L9.25806 3.35128C9.39565 3.57286 9.61437 3.73191 9.86756 3.79452L12.4578 4.43498C13.1768 4.61276 13.4597 5.48318 12.9828 6.04977L11.2619 8.09385C11.0942 8.29311 11.0108 8.54997 11.0295 8.80977L11.2217 11.475C11.275 12.2143 10.5336 12.7526 9.84717 12.4731L7.37793 11.4677C7.13616 11.3692 6.86549 11.3692 6.62372 11.4677L4.15448 12.4731C3.46801 12.7526 2.72667 12.2143 2.77997 11.475L2.97211 8.80977C2.99084 8.54997 2.90745 8.29311 2.7397 8.09385L1.01889 6.04977C0.541904 5.48318 0.824883 4.61276 1.54386 4.43498L4.13408 3.79452C4.38728 3.73191 4.606 3.57286 4.74359 3.35128L6.15129 1.0843Z" fill="#7000FF"></path></svg>
              за материал
            </div>
            <p class="add_post-text">Вы можете опубликовать свой материал! Опубликуем?</p>
            <div @click="objModal.activeModalAddPost = true" class="add_post-img">
              <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.5" cy="20.3966" r="20" fill="white"></circle><circle cx="20.6562" cy="20.2921" r="20" fill="white"></circle><path d="M20.6562 15.2921V25.2921M15.6562 20.2921H25.6562" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
          </div>
          <div class="satellites-body_material-draft DF FDC JCSB">
            <div class="DF JCSB">
              <div class="material-info_img">
                <img src="https://kronadev.ru/local/templates/kronaclub/build/img/avatar.png" alt="">
              </div>
              <div class="material-info_edit">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.8205 1.48855L5.66609 6.64294C5.39976 6.9089 5.21813 7.24774 5.14408 7.61676L4.66797 10L7.05121 9.52299C7.42022 9.44919 7.75862 9.26829 8.02503 9.00188L13.1794 3.84749C13.3343 3.6926 13.4572 3.50872 13.541 3.30635C13.6248 3.10397 13.668 2.88707 13.668 2.66802C13.668 2.44898 13.6248 2.23207 13.541 2.0297C13.4572 1.82732 13.3343 1.64344 13.1794 1.48855C13.0245 1.33366 12.8406 1.2108 12.6383 1.12697C12.4359 1.04314 12.219 1 11.9999 1C11.7809 1 11.564 1.04314 11.3616 1.12697C11.1592 1.2108 10.9754 1.33366 10.8205 1.48855Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.334 9.99998V12C11.334 12.3536 11.1935 12.6927 10.9435 12.9428C10.6934 13.1928 10.3543 13.3333 10.0007 13.3333H2.66732C2.3137 13.3333 1.97456 13.1928 1.72451 12.9428C1.47446 12.6927 1.33398 12.3536 1.33398 12V4.66665C1.33398 4.31302 1.47446 3.97389 1.72451 3.72384C1.97456 3.47379 2.3137 3.33331 2.66732 3.33331H4.66732" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
            </div>
            <div class="material-text">
              <div class="material-text_title">No name</div>
              <div class="material-text_desc">No name</div>
            </div>
            <div class="material-blur JCC AIC">
              <div class="material-blur_action">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M23.0915 14.4886L17.9371 19.6429C17.6708 19.9089 17.4891 20.2477 17.4151 20.6168L16.939 23L19.3222 22.523C19.6912 22.4492 20.0296 22.2683 20.296 22.0019L25.4504 16.8475C25.6053 16.6926 25.7282 16.5087 25.812 16.3063C25.8958 16.104 25.939 15.8871 25.939 15.668C25.939 15.449 25.8958 15.2321 25.812 15.0297C25.7282 14.8273 25.6053 14.6434 25.4504 14.4886C25.2955 14.3337 25.1116 14.2108 24.9093 14.127C24.7069 14.0431 24.49 14 24.2709 14C24.0519 14 23.835 14.0431 23.6326 14.127C23.4302 14.2108 23.2464 14.3337 23.0915 14.4886Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M23.6055 23V25C23.6055 25.3537 23.465 25.6928 23.2149 25.9428C22.9649 26.1929 22.6258 26.3334 22.2721 26.3334H14.9388C14.5852 26.3334 14.246 26.1929 13.996 25.9428C13.7459 25.6928 13.6055 25.3537 13.6055 25V17.6667C13.6055 17.3131 13.7459 16.9739 13.996 16.7239C14.246 16.4738 14.5852 16.3334 14.9388 16.3334H16.9388" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
              <div class="material-blur_action blur_action-margin_fix">
                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.7993" cy="20" r="20" fill="white"></circle><path d="M23.0243 15.025V16.85H18.5743V15.025H23.0243ZM17.1493 14.75V16.85H15.2993C14.9399 16.85 14.6493 17.1406 14.6493 17.5V18C14.6493 18.1516 14.7727 18.275 14.9243 18.275H15.7259L16.1042 25.3039C16.1042 25.3041 16.1042 25.3043 16.1042 25.3044C16.1332 25.917 16.6397 26.4 17.2524 26.4H24.3462C24.9605 26.4 25.4655 25.9185 25.4944 25.3043C25.4945 25.3042 25.4945 25.304 25.4945 25.3039L25.8727 18.275H26.6743C26.8259 18.275 26.9493 18.1516 26.9493 18V17.5C26.9493 17.1406 26.6587 16.85 26.2993 16.85H24.4493V14.75C24.4493 14.1156 23.9337 13.6 23.2993 13.6H18.2993C17.6649 13.6 17.1493 14.1156 17.1493 14.75ZM24.4457 18.275L24.0838 24.975H17.5149L17.153 18.275H24.4457Z" fill="black" stroke="black" stroke-width="0.3"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="objNav.yourData ? 'DF' : 'DN'">
        <!-- <div class="info-yourData_block">
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
        </div> -->
      </div>
    </div>
  </div>
  <ModalAddMaterial
    v-if="objModal.activeModalAddPost"
    @closeModal="(close) => objModal.activeModalAddPost = close"
    :activeModal="objModal.activeModalAddPost"/>
</template>