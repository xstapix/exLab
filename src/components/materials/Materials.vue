<script setup>
  import {useStore} from '@/stores/postStore'
  import { useAuthStore } from '@/stores/authStore'
  import { useParamsPageStore } from '@/stores/paramsPageStore'
  import { useWindowSizeStore } from '@/stores/windowSizeStore' 

  import VButtonShowMore from '@/components/buttonShowMore/VButtonShowMore.vue'
  import Filter from '@/components/tagFilter/Filter.vue'
  
  import {getMethods} from '@/methods.js'

  import {watch, reactive, defineAsyncComponent} from 'vue'

  import './style.css'
  import './media-style.css'

  const ModalAddMaterial = defineAsyncComponent(
    () => import('@/components/modalAddMaterial/ModalAddMaterial.vue')
  )

  const ModalBlockedPost = defineAsyncComponent(
    () => import('@/components/modalBlockedPost/ModalBlockedPost.vue')
  )

  const postsStore = useStore()
  const authStore = useAuthStore()
  const paramsPageStore = useParamsPageStore()
  const windowSizeStore = useWindowSizeStore()
  const useMethod = getMethods()

  const objCurrentUser = reactive({
    user: authStore.data.user
  })

  const objModal = reactive({
    activeModalAddPost: false,
    activeModalBlocked: false
  })

  const objMaterialBackground = reactive({
    currentBkg: 0,
    allBackgrounds: [
      {
        bkg: 'rgb(40, 67, 248)',
        flash: 'rgb(157, 14, 223)'
      },
      {
        bkg: 'rgb(6, 187, 187)',
        flash: 'rgb(40, 248, 136)'
      },
      {
        bkg: 'rgb(130, 196, 23)',
        flash: 'rgb(248, 152, 40)'
      },
      {
        bkg: 'rgb(241, 152, 6)',
        flash: 'rgb(247, 104, 232)'
      },
      {
        bkg: 'rgb(157, 14, 223)',
        flash: 'rgb(38, 68, 247)'
      },
      {
        bkg: 'rgb(237, 58, 232)',
        flash: 'rgb(235, 155, 29)'
      }
    ]
  })

  // let allMaterials = document.querySelectorAll('.post');

  watch(authStore.data, (newUser) => {
    objCurrentUser.user = newUser.user;
  })

  const handlerFavorite = (e) => {
    if (objCurrentUser.user.favorites.includes(e.target.id)) {
      let newFavorites = objCurrentUser.user.favorites.filter(id => id != e.target.id)
      objCurrentUser.user.favorites = newFavorites
    } else {
      objCurrentUser.user.favorites.push(e.target.id)
    }
  } 

  const handlerCheck = (e) => {
    if (objCurrentUser.user.viewed.includes(e.target.id)) {
      let newFavorites = objCurrentUser.user.viewed.filter(id => id != e.target.id)
      objCurrentUser.user.viewed = newFavorites
    } else {
      objCurrentUser.user.viewed.push(e.target.id)
      // if (objMaterialBackground.currentBkg < 6) {
      //   objMaterialBackground.currentBkg++
      // } else objMaterialBackground.currentBkg = 0
    }
  }

  const handlerBlockedPost = () => {
    if (!authStore.data.auth) {
      objModal.activeModalBlocked = true
    }
  }

  async function handlerShowMore() {
    paramsPageStore.changePage()
    paramsPageStore.changeLastId()

    await useMethod.getMaterials(paramsPageStore.objParamsPage)
  }

  const addWordMinute = (number) => {
    let remainder = Math.abs(number) % 10;

    if (remainder === 1) {
      return `${number} минута`;
    }
    if (remainder >= 2 && remainder <= 4) {
      return `${number} минуты`;
    }

    return `${number} минут`;
  }
 </script>

<template>
  <div class="materials-wrapper DF FDC">
    <Filter v-if="windowSizeStore.objAdaptive.currentSize < 1200"/>
    <div v-if="postsStore.data.posts" class="postsBody"> 
      <div v-if="authStore.data.auth" class="add_post">
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
      <div v-for="post in postsStore.data.posts" :key="post.id" class="post" 
        :style="
          objCurrentUser.user ? 
            objCurrentUser.user.viewed.includes(post.id) ? 
              {backgroundColor: objMaterialBackground.allBackgrounds[objMaterialBackground.currentBkg].bkg} :
            '' : ''">
        <router-link 
          @click="handlerBlockedPost" 
          :to="authStore.data.auth && !post.open ? `${post.link}` : ''"
          class="DF FDC JCSB">
          <div class="DF JCSB">
            <div class="DF AIC">
              <div class="post_info_author">
                <img class="post_info_author-img" :src="post.author.img" alt="">
              </div>
              <div class="post_info_type">
                <svg v-if="post.type.name === 'Текст'" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="black"></circle><path d="M14.6666 23.4055C14.5838 23.4055 14.5166 23.4727 14.5166 23.5555V24.5333C14.5166 24.6162 14.5838 24.6833 14.6666 24.6833H21C21.1694 24.6833 21.3319 24.616 21.4517 24.4962C21.5715 24.3764 21.6388 24.2139 21.6388 24.0444C21.6388 23.875 21.5715 23.7125 21.4517 23.5927L21.3459 23.6985L21.4517 23.5927C21.3319 23.4729 21.1694 23.4055 21 23.4055H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 20.7389C14.5838 20.7389 14.5166 20.8061 14.5166 20.8889V21.8667C14.5166 21.9495 14.5838 22.0167 14.6666 22.0167H24.4444C24.6138 22.0167 24.7764 21.9494 24.8962 21.8296C25.016 21.7098 25.0833 21.5472 25.0833 21.3778C25.0833 21.2084 25.016 21.0459 24.8962 20.926C24.7764 20.8062 24.6138 20.7389 24.4444 20.7389H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 18.0722C14.5838 18.0722 14.5166 18.1393 14.5166 18.2222V19.1999C14.5166 19.2828 14.5838 19.3499 14.6666 19.3499H21.5555C21.6394 19.3499 21.7225 19.3334 21.8 19.3013C21.8775 19.2692 21.948 19.2221 22.0073 19.1628C22.0666 19.1035 22.1137 19.0331 22.1458 18.9555C22.1779 18.878 22.1944 18.795 22.1944 18.7111C22.1944 18.6272 22.1779 18.5441 22.1458 18.4666C22.1137 18.3891 22.0666 18.3186 22.0073 18.2593C21.948 18.2 21.8775 18.1529 21.8 18.1208C21.7225 18.0887 21.6394 18.0722 21.5555 18.0722H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 15.4055C14.5838 15.4055 14.5166 15.4727 14.5166 15.5555V16.5333C14.5166 16.6162 14.5838 16.6833 14.6666 16.6833H25C25.1694 16.6833 25.3319 16.616 25.4517 16.4962C25.5715 16.3764 25.6388 16.2139 25.6388 16.0444C25.6388 15.875 25.5715 15.7125 25.4517 15.5927C25.3319 15.4729 25.1694 15.4055 25 15.4055H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path></svg>
                <svg v-if="post.type.name === 'Видео'" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="black"></circle><path d="M23.9999 16.6667C23.9999 15.9314 23.4019 15.3334 22.6666 15.3334H14.6666C13.9313 15.3334 13.3333 15.9314 13.3333 16.6667V23.3334C13.3333 24.0687 13.9313 24.6667 14.6666 24.6667H22.6666C23.4019 24.6667 23.9999 24.0687 23.9999 23.3334V21.1114L26.6666 23.3334V16.6667L23.9999 18.8887V16.6667Z" fill="white"></path></svg>
              </div>
              <div class="post_info_date">
                <p>{{ post.date }}</p>
                <p>{{ addWordMinute(post.time) }}</p>
              </div>
            </div>
            <div v-if="!authStore.data.auth && !post.open" class="post_close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_783_6324)"><path d="M8 1.66602C8.72733 1.66602 9.41133 1.86068 10 2.20202C10.0797 2.24369 10.1501 2.30105 10.207 2.37065C10.2639 2.44025 10.3062 2.52064 10.3313 2.60699C10.3563 2.69334 10.3636 2.78387 10.3528 2.87313C10.3419 2.96238 10.3132 3.04852 10.2682 3.12637C10.2232 3.20421 10.1629 3.27215 10.091 3.32609C10.019 3.38004 9.93692 3.41887 9.84959 3.44026C9.76226 3.46165 9.6715 3.46516 9.58278 3.45057C9.49406 3.43597 9.40921 3.40358 9.33333 3.35535C8.92786 3.12125 8.46789 2.99803 7.99968 2.99808C7.53148 2.99814 7.07154 3.12147 6.66612 3.35567C6.2607 3.58986 5.92408 3.92668 5.69012 4.33224C5.45617 4.7378 5.33311 5.19781 5.33333 5.66602L12.6667 5.66668C13.0203 5.66668 13.3594 5.80716 13.6095 6.05721C13.8595 6.30726 14 6.64639 14 7.00002V13.6667C14 14.0203 13.8595 14.3594 13.6095 14.6095C13.3594 14.8595 13.0203 15 12.6667 15H3.33333C2.97971 15 2.64057 14.8595 2.39052 14.6095C2.14048 14.3594 2 14.0203 2 13.6667V6.99935C2 6.64573 2.14048 6.30659 2.39052 6.05654C2.64057 5.80649 2.97971 5.66602 3.33333 5.66602H4C4 4.60515 4.42143 3.58773 5.17157 2.83759C5.92172 2.08744 6.93913 1.66602 8 1.66602ZM12.6667 6.99935H3.33333V13.666H12.6667V6.99935ZM8 8.33268C8.28439 8.33277 8.56131 8.42379 8.79029 8.59245C9.01928 8.7611 9.18834 8.99856 9.27278 9.27013C9.35722 9.54169 9.35262 9.83315 9.25965 10.1019C9.16667 10.3707 8.9902 10.6027 8.756 10.764L8.66667 10.8207V11.666C8.66648 11.8359 8.60141 11.9994 8.48477 12.1229C8.36812 12.2465 8.2087 12.3208 8.03907 12.3308C7.86944 12.3408 7.70241 12.2856 7.57211 12.1765C7.44181 12.0674 7.35807 11.9127 7.338 11.744L7.33333 11.666V10.8207C7.07916 10.6739 6.88052 10.4474 6.76821 10.1762C6.65589 9.90506 6.63619 9.60442 6.71216 9.32092C6.78812 9.03742 6.95551 8.7869 7.18836 8.60823C7.4212 8.42955 7.7065 8.3327 8 8.33268Z" fill="white"></path><path d="M10 2.20202C9.41133 1.86068 8.72733 1.66602 8 1.66602C6.93913 1.66602 5.92172 2.08744 5.17157 2.83759C4.42143 3.58773 4 4.60515 4 5.66602H5.33333C5.33311 5.19781 5.45617 4.7378 5.69012 4.33224C5.92408 3.92668 6.2607 3.58986 6.66612 3.35567C7.07154 3.12147 7.53148 2.99814 7.99968 2.99808C8.46789 2.99803 8.92786 3.12125 9.33333 3.35535C9.40921 3.40358 9.49406 3.43597 9.58278 3.45057C9.6715 3.46516 9.76226 3.46165 9.84959 3.44026C9.93692 3.41887 10.019 3.38004 10.091 3.32609C10.1629 3.27215 10.2232 3.20421 10.2682 3.12637C10.3132 3.04852 10.3419 2.96238 10.3528 2.87313C10.3636 2.78387 10.3563 2.69334 10.3313 2.60699C10.3062 2.52064 10.2639 2.44025 10.207 2.37065C10.1501 2.30105 10.0797 2.24369 10 2.20202Z" fill="white"></path><path d="M6 2.20201C6.58867 1.86068 7.27267 1.66602 8 1.66602C9.06087 1.66602 10.0783 2.08744 10.8284 2.83758C11.5786 3.58773 12 4.60514 12 5.66601H10.6667C10.6669 5.19781 10.5438 4.73779 10.3099 4.33223C10.0759 3.92667 9.73876 3.58955 9.33333 3.35535C8.92786 3.12125 8.46789 2.99803 7.99968 2.99808C7.53148 2.99814 7.07154 3.12147 6.66612 3.35567C6.59024 3.4039 6.50594 3.43597 6.41722 3.45056C6.3285 3.46515 6.23774 3.46165 6.15041 3.44026C6.06308 3.41887 5.98098 3.38003 5.90904 3.32609C5.83711 3.27214 5.77683 3.20421 5.73184 3.12636C5.68684 3.04852 5.65806 2.96238 5.64721 2.87312C5.63637 2.78387 5.6437 2.69334 5.66875 2.60699C5.6938 2.52063 5.73606 2.44024 5.79299 2.37065C5.84991 2.30105 5.92033 2.24369 6 2.20201Z" fill="white"></path></g><defs><clipPath id="clip0_783_6324"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>
              <div class="post_close-tip">Доступно только членам клуба</div>
            </div>
          </div>
          <div class="post_text">
            <p class="post_title">{{post.title}}</p>
            <p class="post_previewText">{{post.previewText}}</p>
          </div>
        </router-link>
        <div v-if="authStore.data.auth" class="post_actions DF">
          <div class="post_actions-favorite"
            @click="handlerFavorite" :id="post.id">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle :id="post.id" cx="20" cy="20" r="20" :fill="objCurrentUser.user ? objCurrentUser.user.favorites.includes(post.id) ? 'black' : 'white' : ''"></circle>
              <path :id="post.id" d="M15.2694 19.889C14.0795 18.2593 14.4761 15.8148 16.4592 15C18.4423 14.1852 19.6321 15.8148 20.0287 16.6297C20.4253 15.8148 22.0118 14.1852 23.9948 15C25.9779 15.8148 25.9779 18.2593 24.7881 19.889C23.5982 21.5186 20.0287 24.7779 20.0287 24.7779C20.0287 24.7779 16.4592 21.5186 15.2694 19.889Z" 
                :stroke="objCurrentUser.user ? objCurrentUser.user.favorites.includes(post.id) ? 'white' : 'black' : ''" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
          <div class="post_actions-check" 
            @click="handlerCheck" :id="post.id">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle :id="post.id" cx="20" cy="20" r="20" :fill="objCurrentUser.user ? objCurrentUser.user.viewed.includes(post.id) ? 'black' : 'white' : ''"></circle>
              <path :id="post.id" d="M21.0448 16.0216C21.2299 15.8455 21.4762 15.7481 21.7317 15.75C21.9872 15.7519 22.232 15.853 22.4144 16.032C22.5967 16.211 22.7025 16.4538 22.7092 16.7092C22.716 16.9647 22.6232 17.2127 22.4506 17.4011L17.2087 23.9567C17.1185 24.0538 17.0097 24.1317 16.8888 24.1858C16.7679 24.2399 16.6373 24.269 16.5048 24.2715C16.3724 24.2739 16.2408 24.2497 16.1179 24.2001C15.9951 24.1505 15.8835 24.0767 15.7898 23.983L12.3136 20.5068C12.2168 20.4166 12.1392 20.3078 12.0853 20.187C12.0314 20.0661 12.0025 19.9356 12.0002 19.8033C11.9978 19.671 12.0222 19.5396 12.0717 19.4169C12.1213 19.2942 12.195 19.1828 12.2886 19.0892C12.3822 18.9957 12.4936 18.9219 12.6163 18.8723C12.739 18.8228 12.8704 18.7984 13.0027 18.8008C13.135 18.8031 13.2655 18.8321 13.3863 18.8859C13.5072 18.9398 13.616 19.0174 13.7062 19.1142L16.4572 21.8639L21.0186 16.0505C21.0268 16.0404 21.0355 16.0308 21.0448 16.0216ZM19.8362 22.7744L21.0448 23.983C21.1385 24.0765 21.25 24.1502 21.3727 24.1996C21.4955 24.249 21.6269 24.2733 21.7592 24.2708C21.8915 24.2684 22.0219 24.2393 22.1427 24.1853C22.2636 24.1314 22.3723 24.0536 22.4624 23.9567L27.7069 17.4011C27.8011 17.3081 27.8756 17.197 27.926 17.0746C27.9763 16.9521 28.0015 16.8208 27.9999 16.6884C27.9984 16.5561 27.9702 16.4253 27.917 16.3041C27.8638 16.1829 27.7867 16.0736 27.6904 15.9828C27.594 15.892 27.4804 15.8216 27.3562 15.7757C27.232 15.7298 27.0998 15.7094 26.9676 15.7157C26.8354 15.722 26.7058 15.755 26.5865 15.8125C26.4673 15.87 26.3609 15.951 26.2736 16.0505L21.7109 21.8639L21.0737 21.2254L19.8349 22.7744H19.8362Z" 
                :fill="objCurrentUser.user ? objCurrentUser.user.viewed.includes(post.id) ? 'white' : 'black' : ''"></path>
            </svg>
          </div>
        </div>
        <div class="post_gradient" 
          :style="
            objCurrentUser.user ? 
              objCurrentUser.user.viewed.includes(post.id) ? 
                {backgroundColor: objMaterialBackground.allBackgrounds[objMaterialBackground.currentBkg].flash} :
              '' : ''">
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
    <VButtonShowMore v-if="postsStore.data.next" @click="handlerShowMore"/>
  </div>
  <Filter v-if="windowSizeStore.objAdaptive.currentSize > 1200"/>
  <ModalAddMaterial 
    v-if="objModal.activeModalAddPost"
    @closeModal="(close) => objModal.activeModalAddPost = close"
    :activeModal="objModal.activeModalAddPost"/>
  <ModalBlockedPost
    v-if="objModal.activeModalBlocked"
    @closeModal="(close) => objModal.activeModalBlocked = close"
    :activeModal="objModal.activeModalBlocked"/>
</template>