<script setup>
  import {reactive, defineAsyncComponent} from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import {getMethods} from '@/methods.js'

  import TheSideBar from '@/components/sideBar/TheSideBar.vue'
  import Carousel from '@/components/swiper/Carousel.vue'
  import TheNotes from '@/components/notes/TheNotes.vue'

  import { useAuthStore } from '@/stores/authStore' 
  import {useStore} from '@/stores/postStore'
  import { useWindowSizeStore } from '@/stores/windowSizeStore' 

  import './style.css'
  import './media-style.css'
  import '@/components/modalBlockedPost/style.css'

  const UsefulMaterials = defineAsyncComponent(
    () => import('@/components/usefulMaterials/UsefulMaterials.vue')
  )

  const WorkForLesson = defineAsyncComponent(
    () => import('@/components/workForLesson/WorkForLesson.vue')
  )
  
  const route = useRoute()
  const router = useRouter()

  const useMethod = getMethods()
  const authStore = useAuthStore()
  const postsStore = useStore()
  const windowSizeStore = useWindowSizeStore()

  document.body.style.backgroundColor = '#E5E5E5'
  
  const objPost = reactive({
    postViewed: {},
    renderKey: 0
  })

  const objActionHover =reactive ({
    info: false,
    goToMaterials: false,
    userful: false,
    favorite: false,
    done: false

  })

  setObjPost()

  async function setObjPost() {
    objPost.postViewed = await useMethod.getPost(route.params.link)
    objPost.renderKey++
  }
  
  const nextPost = async () => {
    objPost.postViewed = await useMethod.getPost(route.params.link) //next
    objPost.renderKey++
  }

  const prevPost = async () => {
    objPost.postViewed = await useMethod.getPost(route.params.link) //prew
    objPost.renderKey++
  }

</script>

<template>
  <div class="DF">
    <TheSideBar/>
    <div class="post-body">
      <router-link v-if="windowSizeStore.objAdaptive.currentSize > 620"
        :to="`/post/${Number(objPost.postViewed.id) - 1}`" 
        @click="prevPost" 
        class="postPrew">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M22 14L16 20L22 26" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </router-link>
      <div v-else></div>
      <div class="DF JCC single_post">
        <div v-if="authStore.data.auth && windowSizeStore.objAdaptive.currentSize > 620" 
          class="single_post-side_bar">
          <div class="single_post-side_bar-inner">
            <div class="post-side_bar-actions DF FDC AIC">
              <p class="post-side_bar-actions-title">Разделы</p>
              <a href="#" class="side_bar-inner_link" 
                @mouseover="objActionHover.goToMaterials = true" 
                @mouseleave="objActionHover.goToMaterials = false">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M26.1 19.3335C26.1005 19.2327 26.0812 19.1328 26.0431 19.0395C26.0049 18.9461 25.9487 18.8612 25.8777 18.7895L25.8774 18.7892L20.544 13.4559L20.5438 13.4557C20.4002 13.3129 20.2059 13.2328 20.0033 13.2328C19.8008 13.2328 19.6065 13.3129 19.4628 13.4557L19.4626 13.4559L14.13 18.7885C14.1299 18.7887 14.1298 18.7888 14.1296 18.7889C14.0574 18.8598 13.9999 18.9444 13.9604 19.0377C13.921 19.1311 13.9004 19.2314 13.9 19.3329V19.3333V25.3333C13.9 25.7134 14.051 26.078 14.3198 26.3468C14.5886 26.6156 14.9532 26.7666 15.3333 26.7666H24.6667C25.0468 26.7666 25.4114 26.6156 25.6802 26.3468C25.949 26.078 26.1 25.7134 26.1 25.3333V19.3335ZM26.1 19.3335C26.1 19.3336 26.1 19.3338 26.1 19.3339L26 19.3333H26.1V19.3335ZM18.7667 25.2333V22.1H21.2333V25.2333H18.7667ZM15.4333 25.2333V19.648L20 15.0814L24.5667 19.648V25.2333H22.7667V22C22.7667 21.6198 22.6157 21.2552 22.3469 20.9864C22.0781 20.7176 21.7135 20.5666 21.3333 20.5666H18.6667C18.2865 20.5666 17.9219 20.7176 17.6531 20.9864C17.3843 21.2552 17.2333 21.6198 17.2333 22V25.2333H15.4333Z" fill="black" stroke="black" stroke-width="0.2"></path></svg>
                <div v-if="objActionHover.goToMaterials" class="side_bar_inner_link_tip">Назад к материалам</div>
              </a>
              <a href="#" class="side_bar-inner_link"
                @mouseover="objActionHover.info = true" 
                @mouseleave="objActionHover.info = false">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M13.3333 16C13.3333 16 14.3333 14.6666 16.6666 14.6666C18.9999 14.6666 19.9999 16 19.9999 16V25.3333C19.9999 25.3333 18.9999 24.6666 16.6666 24.6666C14.3333 24.6666 13.3333 25.3333 13.3333 25.3333V16ZM19.9999 16C19.9999 16 20.9999 14.6666 23.3333 14.6666C25.6666 14.6666 26.6666 16 26.6666 16V25.3333C26.6666 25.3333 25.6666 24.6666 23.3333 24.6666C20.9999 24.6666 19.9999 25.3333 19.9999 25.3333V16Z" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <div v-if="objActionHover.info" class="side_bar_inner_link_tip">Информация</div>
              </a>
              <a href="#" class="side_bar-inner_link"
                @mouseover="objActionHover.userful = true" 
                @mouseleave="objActionHover.userful = false">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M20.0156 18.5781C19.6547 18.5781 19.375 18.8578 19.375 19.2031C19.375 19.5484 19.6547 19.8281 20.0156 19.8281C20.3453 19.8281 20.625 19.5484 20.625 19.2031C20.625 18.8578 20.3453 18.5781 20.0156 18.5781ZM17.6406 18.5781C17.2797 18.5781 17 18.8578 17 19.2031C17 19.5484 17.2797 19.8281 17.6406 19.8281C17.9703 19.8281 18.25 19.5484 18.25 19.2031C18.25 18.8578 17.9703 18.5781 17.6406 18.5781Z" fill="black"></path><path d="M25.9677 17.6615C25.2162 16.7027 24.1663 16.0621 23.0148 15.773V15.7744C22.7476 15.4984 22.4461 15.2442 22.1086 15.0176C19.5509 13.2888 15.9605 13.8162 14.0935 16.1942C12.5889 18.1263 12.6529 20.7252 14.1872 22.5716L14.1997 24.4979C14.1997 24.5444 14.2075 24.5909 14.2231 24.6345C14.306 24.88 14.5872 25.0151 14.8497 24.9381L16.8277 24.3585C17.3511 24.5313 17.8917 24.6301 18.4291 24.6577L18.4213 24.6635C19.8134 25.6063 21.6383 25.8896 23.3116 25.3753L25.2975 25.9768C25.3475 25.9913 25.399 26 25.4521 26C25.7287 26 25.9521 25.7923 25.9521 25.5351V23.5885C27.3286 21.8511 27.3645 19.4498 25.9677 17.6615ZM17.0464 23.327L16.8589 23.2544L15.3121 23.7047L15.2965 22.1939L15.1715 22.0632C13.8497 20.564 13.7622 18.4038 14.9997 16.8189C16.5058 14.8984 19.3931 14.4742 21.4524 15.8601C23.5179 17.2562 23.9757 19.9364 22.4836 21.8453C21.2321 23.4418 18.9916 24.0316 17.0464 23.327ZM24.9365 23.0801L24.8116 23.2253L24.8272 24.7362L23.296 24.2568L23.1085 24.3294C22.2336 24.6316 21.3008 24.6563 20.4368 24.4311L20.4337 24.4296C21.5883 24.0999 22.6351 23.4316 23.3898 22.4699C24.5834 20.9402 24.7772 19.0183 24.0835 17.3797L24.0929 17.3855C24.4522 17.6252 24.7819 17.9244 25.0615 18.2861C26.1958 19.733 26.1318 21.7029 24.9365 23.0801Z" fill="black"></path><path d="M26.1521 23.6574C27.5427 21.8529 27.5648 19.3812 26.1254 17.5384C25.356 16.5568 24.287 15.8979 23.1167 15.5926C22.8504 15.3231 22.552 15.0744 22.2203 14.8517C19.5787 13.0664 15.8696 13.6081 13.9357 16.0714C12.3881 18.0587 12.4383 20.7292 13.9877 22.6437L14.1799 22.5628C12.6527 20.717 12.5913 18.1233 14.0935 16.1942C15.9605 13.8162 19.5509 13.2888 22.1086 15.0176C22.3644 15.1893 22.5996 15.377 22.8148 15.578C22.883 15.6417 22.9492 15.7067 23.0134 15.773L23.0148 15.7744V15.773L23.0206 15.7744C23.0856 15.7908 23.1504 15.8084 23.2148 15.827C24.2705 16.1328 25.2292 16.739 25.934 17.6189L25.9677 17.6615C27.3645 19.4498 27.3286 21.8511 25.9521 23.5885V25.5351C25.9521 25.7923 25.7287 26 25.4521 26C25.399 26 25.3475 25.9913 25.2975 25.9768L23.3116 25.3753C21.7091 25.8678 19.9676 25.6289 18.6003 24.7796C18.5482 24.7473 18.4966 24.714 18.4456 24.6799L18.4286 24.6684L18.4213 24.6635L18.4291 24.6577L18.4254 24.6575L18.4165 24.6571C18.3195 24.6519 18.2223 24.6444 18.1252 24.6345C17.6886 24.5903 17.2525 24.4988 16.8277 24.3585L14.8497 24.9381C14.5872 25.0151 14.306 24.88 14.2231 24.6345C14.2075 24.5909 14.1997 24.5444 14.1997 24.4979L14.1872 22.5716L14.1799 22.5628L13.9877 22.6437L13.9997 24.4986C13.9998 24.5664 14.0111 24.6349 14.0342 24.7002C14.1556 25.0565 14.5518 25.2339 14.906 25.13L16.8246 24.5677C17.3227 24.7267 17.8349 24.821 18.3451 24.8532C19.7666 25.8 21.6112 26.0875 23.3115 25.5843L25.2395 26.1682L25.2417 26.1688C25.3065 26.1877 25.377 26.2 25.4521 26.2C25.8252 26.2 26.1521 25.9162 26.1521 25.5351V23.6574Z" fill="black"></path><path d="M16.8589 23.2544L17.0464 23.327C18.9916 24.0316 21.2321 23.4418 22.4836 21.8453C23.2156 20.9088 23.4783 19.7867 23.3121 18.7217C23.1396 17.6157 22.5046 16.5713 21.4524 15.8601C19.3931 14.4742 16.5058 14.8984 14.9997 16.8189C13.7622 18.4038 13.8497 20.564 15.1715 22.0632L15.2278 22.1221L15.4252 22.0391L15.3189 21.9279C14.0621 20.4997 13.981 18.4487 15.1572 16.9421C16.5965 15.1071 19.3654 14.6968 21.3405 16.0259C22.3616 16.7161 22.9693 17.7314 23.1218 18.8017C23.2641 19.8003 23.0102 20.8468 22.3261 21.722C21.1314 23.2459 18.9849 23.8155 17.1165 23.1397L16.868 23.0434L15.5094 23.439L15.4957 22.1128L15.4252 22.0391L15.2278 22.1221L15.2965 22.1939L15.3121 23.7047L16.8589 23.2544Z" fill="black"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M23.296 24.2568L23.1085 24.3294C22.3638 24.5866 21.5772 24.6428 20.8268 24.5149C20.6956 24.4926 20.5654 24.4646 20.4368 24.4311L20.4337 24.4296L20.4375 24.4286C20.5627 24.3927 20.6873 24.3526 20.8098 24.3089C21.8146 23.9496 22.718 23.3261 23.3898 22.4699C24.3711 21.2123 24.6766 19.6897 24.3688 18.2772C24.3277 18.0885 24.2756 17.9018 24.2128 17.718C24.1752 17.6083 24.1339 17.4996 24.0887 17.3921L24.0835 17.3797L24.0929 17.3855C24.1918 17.4514 24.2884 17.5219 24.3824 17.597C24.5572 17.7366 24.7228 17.892 24.8764 18.0637C24.9403 18.135 25.002 18.2092 25.0615 18.2861C26.1958 19.733 26.1318 21.7029 24.9365 23.0801L24.8116 23.2253L24.8272 24.7362L23.296 24.2568ZM24.7855 22.949C25.9186 21.6434 25.9787 19.7802 24.9041 18.4095L24.9033 18.4085C24.8324 18.3168 24.7581 18.2293 24.6808 18.146C24.6212 18.0817 24.5598 18.0199 24.4967 17.9606C24.5184 18.0395 24.5382 18.1188 24.5562 18.1984C24.8895 19.6775 24.5748 21.2764 23.5474 22.593C22.928 23.3824 22.1194 23.9802 21.218 24.3638C21.8244 24.417 22.4461 24.346 23.0398 24.1416L23.289 24.045L24.6243 24.4631L24.6108 23.152L24.7855 22.949Z" fill="black"></path></svg>
                <div v-if="objActionHover.userful" class="side_bar_inner_link_tip">Полезные материалы</div>
              </a>
            </div>
            <div class="post-side_bar-actions DF FDC AIC">
              <p class="post-side_bar-actions-title">Действия</p>
              <div class="side_bar-inner_link"
                @mouseover="objActionHover.favorite = true" 
                @mouseleave="objActionHover.favorite = false">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M15.2694 19.889C14.0795 18.2593 14.4761 15.8148 16.4592 15C18.4423 14.1852 19.6321 15.8148 20.0287 16.6297C20.4253 15.8148 22.0118 14.1852 23.9948 15C25.9779 15.8148 25.9779 18.2593 24.7881 19.889C23.5982 21.5186 20.0287 24.7779 20.0287 24.7779C20.0287 24.7779 16.4592 21.5186 15.2694 19.889Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <div v-if="objActionHover.favorite" class="side_bar_inner_link_tip">Добавить в избранное</div>
              </div>
              <div class="side_bar-inner_link"
                @mouseover="objActionHover.done = true" 
                @mouseleave="objActionHover.done = false">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M21.0448 16.0216C21.2299 15.8455 21.4762 15.7481 21.7317 15.75C21.9872 15.7519 22.232 15.853 22.4144 16.032C22.5967 16.211 22.7025 16.4538 22.7092 16.7092C22.716 16.9647 22.6232 17.2127 22.4506 17.4011L17.2087 23.9567C17.1185 24.0538 17.0097 24.1317 16.8888 24.1858C16.7679 24.2399 16.6373 24.269 16.5048 24.2715C16.3724 24.2739 16.2408 24.2497 16.1179 24.2001C15.9951 24.1505 15.8835 24.0767 15.7898 23.983L12.3136 20.5068C12.2168 20.4166 12.1392 20.3078 12.0853 20.187C12.0314 20.0661 12.0025 19.9356 12.0002 19.8033C11.9978 19.671 12.0222 19.5396 12.0717 19.4169C12.1213 19.2942 12.195 19.1828 12.2886 19.0892C12.3822 18.9957 12.4936 18.9219 12.6163 18.8723C12.739 18.8228 12.8704 18.7984 13.0027 18.8008C13.135 18.8031 13.2655 18.8321 13.3863 18.8859C13.5072 18.9398 13.616 19.0174 13.7062 19.1142L16.4572 21.8639L21.0186 16.0505C21.0268 16.0404 21.0355 16.0308 21.0448 16.0216ZM19.8362 22.7744L21.0448 23.983C21.1385 24.0765 21.25 24.1502 21.3727 24.1996C21.4955 24.249 21.6269 24.2733 21.7592 24.2708C21.8915 24.2684 22.0219 24.2393 22.1427 24.1853C22.2636 24.1314 22.3723 24.0536 22.4624 23.9567L27.7069 17.4011C27.8011 17.3081 27.8756 17.197 27.926 17.0746C27.9763 16.9521 28.0015 16.8208 27.9999 16.6884C27.9984 16.5561 27.9702 16.4253 27.917 16.3041C27.8638 16.1829 27.7867 16.0736 27.6904 15.9828C27.594 15.892 27.4804 15.8216 27.3562 15.7757C27.232 15.7298 27.0998 15.7094 26.9676 15.7157C26.8354 15.722 26.7058 15.755 26.5865 15.8125C26.4673 15.87 26.3609 15.951 26.2736 16.0505L21.7109 21.8639L21.0737 21.2254L19.8349 22.7744H19.8362Z" fill="black"></path></svg>
                <div v-if="objActionHover.done" class="side_bar_inner_link_tip">Завершить урок</div>
              </div>
            </div>
          </div>
        </div>
        <div class="single_post-body">
          <div class="DF AIC">
            <div class="post_info_author">
              <img class="post_info_author-img" src="/yyhqfinwoon1yvcb6hm7jam67nnus0ec.png" alt="">
            </div>
            <div class="post_info_type">
              <!-- <svg v-if="post.type.name === 'Текст'" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="black"></circle><path d="M14.6666 23.4055C14.5838 23.4055 14.5166 23.4727 14.5166 23.5555V24.5333C14.5166 24.6162 14.5838 24.6833 14.6666 24.6833H21C21.1694 24.6833 21.3319 24.616 21.4517 24.4962C21.5715 24.3764 21.6388 24.2139 21.6388 24.0444C21.6388 23.875 21.5715 23.7125 21.4517 23.5927L21.3459 23.6985L21.4517 23.5927C21.3319 23.4729 21.1694 23.4055 21 23.4055H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 20.7389C14.5838 20.7389 14.5166 20.8061 14.5166 20.8889V21.8667C14.5166 21.9495 14.5838 22.0167 14.6666 22.0167H24.4444C24.6138 22.0167 24.7764 21.9494 24.8962 21.8296C25.016 21.7098 25.0833 21.5472 25.0833 21.3778C25.0833 21.2084 25.016 21.0459 24.8962 20.926C24.7764 20.8062 24.6138 20.7389 24.4444 20.7389H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 18.0722C14.5838 18.0722 14.5166 18.1393 14.5166 18.2222V19.1999C14.5166 19.2828 14.5838 19.3499 14.6666 19.3499H21.5555C21.6394 19.3499 21.7225 19.3334 21.8 19.3013C21.8775 19.2692 21.948 19.2221 22.0073 19.1628C22.0666 19.1035 22.1137 19.0331 22.1458 18.9555C22.1779 18.878 22.1944 18.795 22.1944 18.7111C22.1944 18.6272 22.1779 18.5441 22.1458 18.4666C22.1137 18.3891 22.0666 18.3186 22.0073 18.2593C21.948 18.2 21.8775 18.1529 21.8 18.1208C21.7225 18.0887 21.6394 18.0722 21.5555 18.0722H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 15.4055C14.5838 15.4055 14.5166 15.4727 14.5166 15.5555V16.5333C14.5166 16.6162 14.5838 16.6833 14.6666 16.6833H25C25.1694 16.6833 25.3319 16.616 25.4517 16.4962C25.5715 16.3764 25.6388 16.2139 25.6388 16.0444C25.6388 15.875 25.5715 15.7125 25.4517 15.5927C25.3319 15.4729 25.1694 15.4055 25 15.4055H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path></svg> -->
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="black"></circle><path d="M23.9999 16.6667C23.9999 15.9314 23.4019 15.3334 22.6666 15.3334H14.6666C13.9313 15.3334 13.3333 15.9314 13.3333 16.6667V23.3334C13.3333 24.0687 13.9313 24.6667 14.6666 24.6667H22.6666C23.4019 24.6667 23.9999 24.0687 23.9999 23.3334V21.1114L26.6666 23.3334V16.6667L23.9999 18.8887V16.6667Z" fill="white"></path></svg>
            </div>
            <div class="post_info_date">
              <p class="info_date_text-gray">08.02.2023</p>
              <p class="info_date_text-gray">42 минут</p>
            </div>
          </div>
          <div class="single_post-content">
            <div class="add_post-tip DF">
              + 0.1
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.15129 1.0843C6.54247 0.454335 7.45918 0.454335 7.85036 1.0843L9.25806 3.35128C9.39565 3.57286 9.61437 3.73191 9.86756 3.79452L12.4578 4.43498C13.1768 4.61276 13.4597 5.48318 12.9828 6.04977L11.2619 8.09385C11.0942 8.29311 11.0108 8.54997 11.0295 8.80977L11.2217 11.475C11.275 12.2143 10.5336 12.7526 9.84717 12.4731L7.37793 11.4677C7.13616 11.3692 6.86549 11.3692 6.62372 11.4677L4.15448 12.4731C3.46801 12.7526 2.72667 12.2143 2.77997 11.475L2.97211 8.80977C2.99084 8.54997 2.90745 8.29311 2.7397 8.09385L1.01889 6.04977C0.541904 5.48318 0.824883 4.61276 1.54386 4.43498L4.13408 3.79452C4.38728 3.73191 4.606 3.57286 4.74359 3.35128L6.15129 1.0843Z" fill="#7000FF"></path></svg>
              за завершенный материал
            </div>
            <p class="single_post-content_title">Марафон по социальным сетям. Готовим аккаунт к продвижению</p>
            <p v-if="authStore.data.auth" class="single_post-content_main_text">Дайджест материалов за январь 2023</p>
          </div>
          <TheNotes v-if="authStore.data.auth && windowSizeStore.objAdaptive.currentSize < 1300"/>
          <UsefulMaterials
            v-if="authStore.data.auth"
            :key="objPost.renderKey"
            :postViewed="objPost.postViewed"/>
          <WorkForLesson
            v-if="authStore.data.auth"/>
          <Carousel 
            v-if="authStore.data.auth"
            :key="objPost.renderKey" 
            :activePost="objPost.postViewed"/>
          <div v-if="!authStore.data.auth" class="blocked-modal_body">
            <p class="blocked-modal_body-text">Вы хотите присоединитсья к клубу?</p>
            <p class="blocked-modal_body-desc">Данный материал доступен только в рамках клуба дизайнеров «1000 звёзд».</p>
            <div class="DF blocked-modal_body-btn">
              <a href="https://school.krona.studio/club-1000-stars" target="_blank" class="blocked-modal_body-join">Присоединиться</a>
              <router-link to="/" class="blocked-modal_body-cancel">Отмена</router-link>
            </div>
          </div>
        </div>
        <TheNotes v-if="authStore.data.auth && windowSizeStore.objAdaptive.currentSize > 1300"/>
      </div>
      <router-link v-if="route.params.id != postsStore.data.posts.length - 1 && windowSizeStore.objAdaptive.currentSize > 620"
        :to="`/post/${Number(objPost.postViewed.id) + 1}`" 
        @click="nextPost" 
        class="postNext">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle r="20" transform="matrix(-1 0 0 1 20 20)" fill="white"></circle><path d="M18 14L24 20L18 26" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </router-link>
      <div v-else></div>
    </div>
  </div>
  
</template>