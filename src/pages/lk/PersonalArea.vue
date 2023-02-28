<script setup>
  import SideBar from '@/components/SideBar/SideBar.vue'

  import { useAuthStore } from '@/stores/authStore'
  import { useWindowSizeStore } from '@/stores/windowSizeStore' 

  import {getMethods} from '@/methods.js'

  import { useRouter } from 'vue-router'

  import { reactive, watch, defineAsyncComponent } from 'vue';

  import './style.css'
  import './media-style.css'
  import '@/components/materials/style.css'
  
  const ModalAddMaterial = defineAsyncComponent(
    () => import('@/components/ModalAddMaterial/ModalAddMaterial.vue')
  )

  const ModalAddWork = defineAsyncComponent(
    () => import('@/components/ModalAddWork/ModalAddWork.vue')
  )

  const authStore = useAuthStore()
  const windowSizeStore = useWindowSizeStore()
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

  const objButtonSave = reactive({
    buttonSave: false
  })

  const objModal = reactive({
    activeModalAddPost: false,
    activeWorkModal: false
  })

  const objProfileTabs = reactive({
    card: true,
    data: false,
  })

  const objDataTip = reactive({
    level: false,
    month: false,
    balanceStar: false,
    daysEndSubscription: false,
    discount: false,
    clubPrice: false
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
    objButtonSave.buttonSave = true
  })

  const handlerSave = async () => {
    let formData = new FormData()

    formData.append('method', 'sendTest')
    formData.append('user', objAuth.user)

    authStore.changeUser(objAuth.user)

    objButtonSave.buttonSave = false

    await useMethod.sendWork(formData)
      .then((res) => console.log(res))
      .catch((rej) => console.log(rej))
  }

  const handlerTgShowBox = () => {

  }

  const handlerEmailShowBox = () => {
    
  }

  const handlerProfileTabs = (tabs) => {
    if (tabs === 'data') {
      objProfileTabs.data = true
      objProfileTabs.card = false
    } else {
      objProfileTabs.data = false
      objProfileTabs.card = true
    }
  }

</script>

<template>
  <div v-if="authStore.data.auth" :class="windowSizeStore.objAdaptive.mobile ? 'DB' : 'DF'">
    <SideBar/>
    <div v-if="windowSizeStore.objAdaptive.tablet || windowSizeStore.objAdaptive.desktop" class="profile_preview DF FDC JCSB">
      <div>
        <div class="profile_preview-photo DF JCC AIC">
          <div class="profile_preview-img">
            <div class="profile_preview-upload">
              <input type="file" accept="image/png,image/jpeg" class="profile_preview-upload_input">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 6L19 6C19.5523 6 20 5.55228 20 5C20 4.44772 19.5523 4 19 4L5 4C4.44771 4 4 4.44772 4 5C4 5.55228 4.44771 6 5 6Z" fill="white"></path><path d="M20 7V5C20 4.44772 19.5523 4 19 4C18.4477 4 18 4.44772 18 5V7C18 7.55228 18.4477 8 19 8C19.5523 8 20 7.55228 20 7Z" fill="white"></path><path d="M6 7V5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5V7C4 7.55228 4.44772 8 5 8C5.55228 8 6 7.55228 6 7Z" fill="white"></path><path d="M8 14C7.84476 14 7.69164 13.9639 7.55279 13.8945C7.41393 13.825 7.29315 13.7242 7.2 13.6C7.12121 13.495 7.06388 13.3754 7.03129 13.2482C6.99869 13.121 6.99148 12.9886 7.01005 12.8586C7.02862 12.7286 7.07262 12.6035 7.13953 12.4905C7.20643 12.3775 7.29494 12.2788 7.4 12.2L11.4 9.20004C11.5713 9.07489 11.7779 9.00745 11.99 9.00745C12.2021 9.00745 12.4087 9.07489 12.58 9.20004L16.58 12.02C16.7956 12.173 16.9419 12.405 16.9868 12.6655C17.0318 12.926 16.9718 13.1937 16.82 13.41C16.7442 13.5182 16.6478 13.6103 16.5362 13.6809C16.4246 13.7516 16.3002 13.7995 16.17 13.8218C16.0399 13.8441 15.9066 13.8404 15.7778 13.8109C15.6491 13.7815 15.5275 13.7268 15.42 13.65L12 11.24L8.6 13.8C8.4269 13.9299 8.21637 14 8 14Z" fill="white"></path><path d="M12 21C11.7348 21 11.4804 20.8946 11.2929 20.7071C11.1054 20.5196 11 20.2652 11 20V12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12V20C13 20.2652 12.8946 20.5196 12.7071 20.7071C12.5196 20.8946 12.2652 21 12 21Z" fill="white"></path></svg>
            </div>
            <img src="https://kronadev.ru/local/templates/kronaclub/build/img/avatar2.png" alt="">
          </div>
          <div class="profile_preview-photo_line">
            <div class="preview-photo_line-item">
              <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.986048 1.10408C1.04378 0.554826 1.53648 0.153807 2.08216 0.238908C6.22738 0.885363 10.0739 2.82118 13.0679 5.78402C16.0619 8.74685 18.0379 12.5729 18.7277 16.7111C18.8185 17.2559 18.4227 17.7527 17.8741 17.8162C17.3255 17.8797 16.8321 17.4856 16.7382 16.9414C16.1026 13.2548 14.3319 9.84862 11.6611 7.20561C8.99029 4.56261 5.56572 2.82767 1.87271 2.2307C1.32751 2.14257 0.928318 1.65334 0.986048 1.10408Z" fill="url(#paint0_angular_221_1472_user)"></path>
                <defs>
                <radialGradient id="paint0_angular_221_1472_user" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1 20) rotate(-90) scale(20)">
                <stop stop-color="#ABAD23"></stop>
                <stop offset="0.250003" stop-color="#666723"></stop>
                </radialGradient>
                </defs>
              </svg>
            </div>
            <div class="preview-photo_line-item">
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" d="M16.8959 0.986048C17.4452 1.04378 17.8462 1.53648 17.7611 2.08217C17.1146 6.22738 15.1788 10.0739 12.216 13.0679C9.25315 16.0619 5.42713 18.0379 1.28891 18.7277C0.744145 18.8185 0.247274 18.4227 0.183796 17.8741V17.8741C0.120318 17.3255 0.514363 16.8321 1.05862 16.7382C4.74517 16.1026 8.15138 14.3319 10.7944 11.6611C13.4374 8.99029 15.1723 5.56572 15.7693 1.87271C15.8574 1.32751 16.3467 0.928318 16.8959 0.986048V0.986048Z" fill="white"></path>
              </svg>
            </div>
            <div class="preview-photo_line-item">
              <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" d="M18.014 16.8959C17.9562 17.4452 17.4635 17.8462 16.9178 17.7611C12.7726 17.1146 8.92612 15.1788 5.9321 12.216C2.93808 9.25315 0.962091 5.42713 0.272268 1.28891C0.181455 0.744143 0.577295 0.247271 1.12592 0.183794C1.67454 0.120316 2.16792 0.514361 2.26176 1.05862C2.89736 4.74517 4.66807 8.15138 7.33889 10.7944C10.0097 13.4374 13.4343 15.1723 17.1273 15.7693C17.6725 15.8574 18.0717 16.3467 18.014 16.8959Z" fill="white"></path>
              </svg>
            </div>
            <div class="preview-photo_line-item">
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" d="M1.10408 18.0142C0.554825 17.9565 0.153806 17.4638 0.238907 16.9181C0.885362 12.7729 2.82118 8.92636 5.78401 5.93234C8.74685 2.93832 12.5729 0.962333 16.7111 0.27251C17.2559 0.181697 17.7527 0.577537 17.8162 1.12616C17.8797 1.67478 17.4856 2.16816 16.9414 2.262C13.2548 2.8976 9.84862 4.66831 7.20561 7.33913C4.56261 10.01 2.82767 13.4345 2.2307 17.1275C2.14257 17.6727 1.65334 18.0719 1.10408 18.0142Z" fill="white"></path>
              </svg>
            </div>
          </div>
          <div class="profile_preview-photo_point">
            <div class="preview-photo_point-item">
              <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="#343437"></circle></svg>
            </div>
            <div class="preview-photo_point-item">
              <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="#343437"></circle></svg>
            </div>
            <div class="preview-photo_point-item">
              <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="#343437"></circle></svg>
            </div>
            <div class="preview-photo_point-item">
              <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="#343437"></circle></svg>
            </div>
          </div>
        </div>
        <div class="profile_preview-name">
          <p class="profile_preview-name_text">xstapix</p>
          <p class="profile_preview-name_desc">
            v.sarafannikov / канареечный старк
          </p>
        </div>
        <div class="profile_preview-tabs DF">
          <div 
            class="profile_preview-tabs_item" 
            :class="{tabs_item_active: objProfileTabs.card}"
            @click="handlerProfileTabs('card')">Визитка</div>
          <div 
            class="profile_preview-tabs_item" 
            :class="{tabs_item_active: objProfileTabs.data}"
            @click="handlerProfileTabs('data')">Данные</div>
        </div>
        <div v-if="objProfileTabs.card" class="profile_preview-card DF FDC JCC AIC">
          <p class="profile_preview-card_text">Загрузите видео о себе для посетителей вашей страницы.</p>
          <p class="profile_preview-card_text card_text-tip">(mp4, прямоугольный формат 16:9, до 1 минуты)</p>
          <div>
            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.156" cy="20.2919" r="20" fill="white"></circle><path d="M20.156 15.2919V25.2919M15.156 20.2919H25.156" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
        </div>
        <div v-if="objProfileTabs.data" class="profile_preview-data DF FW">
          <div class="profile_preview-data_box"
            @mouseover="objDataTip.level = true" 
            @mouseleave="objDataTip.level = false">
            <div class="profile_preview-data_item">
              <div class="DF">
                <div class="data_item-img">
                  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.3341 0.0661154V8H0.683787V0.0661154H2.3341ZM8.65815 2.04959L6.57783 8H4.71833L2.63801 2.04959H4.3813L5.61709 6.30708H5.67907L6.911 2.04959H8.65815ZM10.6075 0.0661154V8H8.95723V0.0661154H10.6075ZM12.3487 8.10072C12.093 8.10072 11.8735 8.01033 11.6901 7.82955C11.5093 7.64618 11.4189 7.42665 11.4189 7.17097C11.4189 6.91787 11.5093 6.70093 11.6901 6.52014C11.8735 6.33936 12.093 6.24897 12.3487 6.24897C12.5966 6.24897 12.8136 6.33936 12.9995 6.52014C13.1855 6.70093 13.2784 6.91787 13.2784 7.17097C13.2784 7.34143 13.2345 7.49768 13.1467 7.63972C13.0615 7.77918 12.9492 7.89153 12.8097 7.97676C12.6702 8.0594 12.5166 8.10072 12.3487 8.10072Z" fill="white"></path></svg>
                </div>
                <div class="data_item-number">
                  167
                </div>
              </div>
              <p class="profile_preview-data_item-text">уровень звездности</p>
            </div>
            <div v-if="objDataTip.level" class="profile_preview-data_box-tip">Соответствует количеству материалов, отмеченных просмотрено</div>
          </div>
          <div class="profile_preview-data_box"
            @mouseover="objDataTip.month = true" 
            @mouseleave="objDataTip.month = false">
            <div class="profile_preview-data_item">
              <div class="DF">
                <div class="data_item-img">
                  <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.46875C2 3.20996 2.22396 3 2.5 3H9.5C9.77708 3 10 3.20996 10 3.46875C10 3.72754 9.77708 3.9375 9.5 3.9375H9.33333V4.3082C9.33333 5.0957 8.98125 5.83398 8.40625 6.4082L6.70625 8L8.40625 9.5918C8.98125 10.1484 9.33333 10.9043 9.33333 11.6914V12.0625H9.5C9.77708 12.0625 10 12.2715 10 12.5312C10 12.791 9.77708 13 9.5 13H2.5C2.22396 13 2 12.791 2 12.5312C2 12.2715 2.22396 12.0625 2.5 12.0625H2.66667V11.6914C2.66667 10.9043 3.00021 10.1484 3.59417 9.5918L5.29375 8L3.59417 6.4082C3.00021 5.83398 2.66667 5.0957 2.66667 4.3082V3.9375H2.5C2.22396 3.9375 2 3.72754 2 3.46875ZM4.07875 10.5H7.92083C7.85417 10.4141 7.77917 10.332 7.69792 10.2559L6 8.66211L4.30208 10.2559C4.22083 10.332 4.12708 10.4141 4.07875 10.5ZM7.92083 5.5C8.16875 5.15625 8.33333 4.73887 8.33333 4.3082V3.9375H3.66667V4.3082C3.66667 4.73887 3.8125 5.15625 4.07875 5.5H7.92083Z" fill="white"></path></svg>
                </div>
                <div class="data_item-number">
                  167
                </div>
              </div>
              <p class="profile_preview-data_item-text">месяцы в клубе</p>
            </div>
            <div v-if="objDataTip.month" class="profile_preview-data_box-tip">Длительность вашего непрерывного нахождения в клубе</div>
          </div>
          <div class="profile_preview-data_box"
            @mouseover="objDataTip.balanceStar = true" 
            @mouseleave="objDataTip.balanceStar = false">
            <div class="profile_preview-data_item">
              <div class="DF">
                <div class="data_item-img">
                  <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.32804 1.16812C6.71922 0.538152 7.63594 0.538152 8.02712 1.16812L9.43482 3.4351C9.57241 3.65668 9.79112 3.81573 10.0443 3.87834L12.6345 4.5188C13.3535 4.69657 13.6365 5.567 13.1595 6.13359L11.4387 8.17766C11.271 8.37693 11.1876 8.63379 11.2063 8.89359L11.3984 11.5588C11.4517 12.2981 10.7104 12.8364 10.0239 12.5569L7.55468 11.5515C7.31292 11.4531 7.04225 11.4531 6.80048 11.5515L4.33124 12.5569C3.64477 12.8364 2.90343 12.2981 2.95673 11.5588L3.14886 8.89359C3.16759 8.63379 3.08421 8.37693 2.91646 8.17766L1.19565 6.13359C0.718662 5.567 1.00164 4.69657 1.72062 4.5188L4.31084 3.87834C4.56404 3.81573 4.78276 3.65668 4.92035 3.4351L6.32804 1.16812Z" fill="white"></path></svg>
                </div>
                <div class="data_item-number">
                  167
                </div>
              </div>
              <p class="profile_preview-data_item-text">текущий баланс звезд</p>
            </div>
            <div v-if="objDataTip.balanceStar" class="profile_preview-data_box-tip">
              <p>Текущий баланс ― количество звезд, доступных для списывания</p>
              <div>Звезды присуждаются:</div>
              <ul>
                <li>+0.1 ⭐️за пройденный урок</li>
                <li>+1 ⭐️за любое количество комментариев к одному уроку</li>
                <li>+2 ️⭐️за любое количество работ к одному уроку</li>
              </ul>
            </div>
          </div>
          <div class="profile_preview-data_box"
            @mouseover="objDataTip.daysEndSubscription = true" 
            @mouseleave="objDataTip.daysEndSubscription = false">
            <div class="profile_preview-data_item">
              <div class="DF">
                <div class="data_item-img">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_287_5551)"><path d="M11.0002 7.00005C11.2224 7.00005 11.4113 7.07783 11.5669 7.23338C11.7224 7.38894 11.8002 7.57783 11.8002 7.80005V12.6001C11.8002 12.8223 11.7224 13.0112 11.5669 13.1667C11.4113 13.3223 11.2224 13.4001 11.0002 13.4001H3.0002C2.77797 13.4001 2.58908 13.3223 2.43353 13.1667C2.27797 13.0112 2.2002 12.8223 2.2002 12.6001V7.80005C2.2002 7.57783 2.27797 7.38894 2.43353 7.23338C2.58908 7.07783 2.77797 7.00005 3.0002 7.00005H3.26686V4.33338C3.26686 3.30561 3.63214 2.42644 4.36269 1.69589C5.09325 0.96533 5.97242 0.600052 7.00019 0.600052C8.02797 0.600052 8.90714 0.96533 9.63769 1.69589C10.3682 2.42644 10.7335 3.30561 10.7335 4.33338C10.7335 4.47783 10.6807 4.60283 10.5752 4.70838C10.4696 4.81394 10.3446 4.86672 10.2002 4.86672H9.66686C9.52242 4.86672 9.39742 4.81394 9.29186 4.70838C9.18631 4.60283 9.13353 4.47783 9.13353 4.33338C9.13353 3.7445 8.92519 3.24172 8.50853 2.82505C8.09186 2.40839 7.58908 2.20005 7.00019 2.20005C6.41131 2.20005 5.90853 2.40839 5.49186 2.82505C5.07519 3.24172 4.86686 3.7445 4.86686 4.33338V7.00005H11.0002Z" fill="white"></path></g><defs><clipPath id="clip0_287_5551"><rect width="12.8" height="12.8" fill="white" transform="translate(0.600098 0.600052)"></rect></clipPath></defs></svg>
                </div>
                <div class="data_item-number">
                  167
                </div>
              </div>
              <p class="profile_preview-data_item-text">дней до конца подписки</p>
            </div>
            <div v-if="objDataTip.daysEndSubscription" class="profile_preview-data_box-tip">Количество оставшихся дней оплаченного периода подписки</div>
          </div>
          <div class="profile_preview-data_box"
            @mouseover="objDataTip.discount = true" 
            @mouseleave="objDataTip.discount = false">
            <div class="profile_preview-data_item">
              <div class="DF">
                <div class="data_item-num">
                  %
                </div>
              </div>
              <p class="profile_preview-data_item-text">персональная скидка</p>
            </div>
            <div v-if="objDataTip.discount" class="profile_preview-data_box-tip">Ваша персональная скидка, которая действует от вашей базовой стоимости подписки</div>
          </div>
          <div class="profile_preview-data_box"
            @mouseover="objDataTip.clubPrice = true" 
            @mouseleave="objDataTip.clubPrice = false">
            <div class="profile_preview-data_item">
              <div class="DF">
                <div class="data_item-number">
                  1300₽
                </div>
              </div>
              <p class="profile_preview-data_item-text">базовая цена клуба</p>
            </div>
            <div v-if="objDataTip.clubPrice" class="profile_preview-data_box-tip">Ваша базовая стоимость подписки без учета скидок и других бонусов</div>
          </div>
        </div>
        <div v-if="objProfileTabs.data"></div>
      </div>
      <div class="profile_preview-link">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M21.0295 18.9706C20.4835 18.4248 19.743 18.1182 18.9709 18.1182C18.1988 18.1182 17.4583 18.4248 16.9122 18.9706L14.8529 21.0293C14.3068 21.5754 14 22.316 14 23.0883C14 23.8606 14.3068 24.6012 14.8529 25.1473C15.3989 25.6934 16.1396 26.0002 16.9119 26.0002C17.6841 26.0002 18.4248 25.6934 18.9709 25.1473L20.0002 24.118" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.9707 21.0293C19.5168 21.5752 20.2573 21.8818 21.0294 21.8818C21.8015 21.8818 22.542 21.5752 23.088 21.0293L25.1474 18.9707C25.6935 18.4246 26.0002 17.6839 26.0002 16.9117C26.0002 16.1394 25.6935 15.3987 25.1474 14.8527C24.6013 14.3066 23.8606 13.9998 23.0884 13.9998C22.3161 13.9998 21.5755 14.3066 21.0294 14.8527L20 15.882" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
    </div>
    <div v-if="windowSizeStore.objAdaptive.mobile" class="profile_preview-modil DF FDC JCC">
      <div class="preview-modil_card">
        <input type="file" accept="video/mp4" class="preview-modil_card-input">
        <p class="preview-modil_card-text">Загрузите видео о себе для посетителей вашей страницы.</p>
        <p class="preview-modil_card-desc">(mp4, прямоугольный формат 16:9, до 1 минуты)</p>
        <div class="preview-modil_card-img">
          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.156" cy="20.2919" r="20" fill="white"></circle><path d="M20.156 15.2919V25.2919M15.156 20.2919H25.156" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
      </div>
      <div class="profile_preview-modil_profile DF AIC">
        <div class="modil_profile-img">
          <input type="file" accept="image/png,image/jpeg" class="profile_preview-upload_input">
          <img src="https://kronadev.ru/local/templates/kronaclub/build/img/avatar2.png" alt="">
        </div>
        <div class="modil_profile-text">
          <div class="modil_profile-text_name">xstapix</div>
          <div class="modil_profile-text_stark">v.sarafannikov / канареечный старк</div>
        </div>
      </div>
    </div>
    <div v-if="windowSizeStore.objAdaptive.mobile" class="profile_preview-modil_data DF FW">
      <div class="profile_preview-data_box"
        @mouseover="objDataTip.level = true" 
        @mouseleave="objDataTip.level = false">
        <div class="profile_preview-data_item">
          <div class="DF">
            <div class="data_item-img">
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.3341 0.0661154V8H0.683787V0.0661154H2.3341ZM8.65815 2.04959L6.57783 8H4.71833L2.63801 2.04959H4.3813L5.61709 6.30708H5.67907L6.911 2.04959H8.65815ZM10.6075 0.0661154V8H8.95723V0.0661154H10.6075ZM12.3487 8.10072C12.093 8.10072 11.8735 8.01033 11.6901 7.82955C11.5093 7.64618 11.4189 7.42665 11.4189 7.17097C11.4189 6.91787 11.5093 6.70093 11.6901 6.52014C11.8735 6.33936 12.093 6.24897 12.3487 6.24897C12.5966 6.24897 12.8136 6.33936 12.9995 6.52014C13.1855 6.70093 13.2784 6.91787 13.2784 7.17097C13.2784 7.34143 13.2345 7.49768 13.1467 7.63972C13.0615 7.77918 12.9492 7.89153 12.8097 7.97676C12.6702 8.0594 12.5166 8.10072 12.3487 8.10072Z" fill="white"></path></svg>
            </div>
            <div class="data_item-number">
              167
            </div>
          </div>
          <p class="profile_preview-data_item-text">уровень звездности</p>
        </div>
        <div v-if="objDataTip.level" class="profile_preview-data_box-tip">Соответствует количеству материалов, отмеченных просмотрено</div>
      </div>
      <div class="profile_preview-data_box"
        @mouseover="objDataTip.month = true" 
        @mouseleave="objDataTip.month = false">
        <div class="profile_preview-data_item">
          <div class="DF">
            <div class="data_item-img">
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.46875C2 3.20996 2.22396 3 2.5 3H9.5C9.77708 3 10 3.20996 10 3.46875C10 3.72754 9.77708 3.9375 9.5 3.9375H9.33333V4.3082C9.33333 5.0957 8.98125 5.83398 8.40625 6.4082L6.70625 8L8.40625 9.5918C8.98125 10.1484 9.33333 10.9043 9.33333 11.6914V12.0625H9.5C9.77708 12.0625 10 12.2715 10 12.5312C10 12.791 9.77708 13 9.5 13H2.5C2.22396 13 2 12.791 2 12.5312C2 12.2715 2.22396 12.0625 2.5 12.0625H2.66667V11.6914C2.66667 10.9043 3.00021 10.1484 3.59417 9.5918L5.29375 8L3.59417 6.4082C3.00021 5.83398 2.66667 5.0957 2.66667 4.3082V3.9375H2.5C2.22396 3.9375 2 3.72754 2 3.46875ZM4.07875 10.5H7.92083C7.85417 10.4141 7.77917 10.332 7.69792 10.2559L6 8.66211L4.30208 10.2559C4.22083 10.332 4.12708 10.4141 4.07875 10.5ZM7.92083 5.5C8.16875 5.15625 8.33333 4.73887 8.33333 4.3082V3.9375H3.66667V4.3082C3.66667 4.73887 3.8125 5.15625 4.07875 5.5H7.92083Z" fill="white"></path></svg>
            </div>
            <div class="data_item-number">
              167
            </div>
          </div>
          <p class="profile_preview-data_item-text">месяцы в клубе</p>
        </div>
        <div v-if="objDataTip.month" class="profile_preview-data_box-tip">Длительность вашего непрерывного нахождения в клубе</div>
      </div>
      <div class="profile_preview-data_box"
        @mouseover="objDataTip.balanceStar = true" 
        @mouseleave="objDataTip.balanceStar = false">
        <div class="profile_preview-data_item">
          <div class="DF">
            <div class="data_item-img">
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.32804 1.16812C6.71922 0.538152 7.63594 0.538152 8.02712 1.16812L9.43482 3.4351C9.57241 3.65668 9.79112 3.81573 10.0443 3.87834L12.6345 4.5188C13.3535 4.69657 13.6365 5.567 13.1595 6.13359L11.4387 8.17766C11.271 8.37693 11.1876 8.63379 11.2063 8.89359L11.3984 11.5588C11.4517 12.2981 10.7104 12.8364 10.0239 12.5569L7.55468 11.5515C7.31292 11.4531 7.04225 11.4531 6.80048 11.5515L4.33124 12.5569C3.64477 12.8364 2.90343 12.2981 2.95673 11.5588L3.14886 8.89359C3.16759 8.63379 3.08421 8.37693 2.91646 8.17766L1.19565 6.13359C0.718662 5.567 1.00164 4.69657 1.72062 4.5188L4.31084 3.87834C4.56404 3.81573 4.78276 3.65668 4.92035 3.4351L6.32804 1.16812Z" fill="white"></path></svg>
            </div>
            <div class="data_item-number">
              167
            </div>
          </div>
          <p class="profile_preview-data_item-text">текущий баланс звезд</p>
        </div>
        <div v-if="objDataTip.balanceStar" class="profile_preview-data_box-tip">
          <p>Текущий баланс ― количество звезд, доступных для списывания</p>
          <div>Звезды присуждаются:</div>
          <ul>
            <li>+0.1 ⭐️за пройденный урок</li>
            <li>+1 ⭐️за любое количество комментариев к одному уроку</li>
            <li>+2 ️⭐️за любое количество работ к одному уроку</li>
          </ul>
        </div>
      </div>
      <div class="profile_preview-data_box"
        @mouseover="objDataTip.daysEndSubscription = true" 
        @mouseleave="objDataTip.daysEndSubscription = false">
        <div class="profile_preview-data_item">
          <div class="DF">
            <div class="data_item-img">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_287_5551)"><path d="M11.0002 7.00005C11.2224 7.00005 11.4113 7.07783 11.5669 7.23338C11.7224 7.38894 11.8002 7.57783 11.8002 7.80005V12.6001C11.8002 12.8223 11.7224 13.0112 11.5669 13.1667C11.4113 13.3223 11.2224 13.4001 11.0002 13.4001H3.0002C2.77797 13.4001 2.58908 13.3223 2.43353 13.1667C2.27797 13.0112 2.2002 12.8223 2.2002 12.6001V7.80005C2.2002 7.57783 2.27797 7.38894 2.43353 7.23338C2.58908 7.07783 2.77797 7.00005 3.0002 7.00005H3.26686V4.33338C3.26686 3.30561 3.63214 2.42644 4.36269 1.69589C5.09325 0.96533 5.97242 0.600052 7.00019 0.600052C8.02797 0.600052 8.90714 0.96533 9.63769 1.69589C10.3682 2.42644 10.7335 3.30561 10.7335 4.33338C10.7335 4.47783 10.6807 4.60283 10.5752 4.70838C10.4696 4.81394 10.3446 4.86672 10.2002 4.86672H9.66686C9.52242 4.86672 9.39742 4.81394 9.29186 4.70838C9.18631 4.60283 9.13353 4.47783 9.13353 4.33338C9.13353 3.7445 8.92519 3.24172 8.50853 2.82505C8.09186 2.40839 7.58908 2.20005 7.00019 2.20005C6.41131 2.20005 5.90853 2.40839 5.49186 2.82505C5.07519 3.24172 4.86686 3.7445 4.86686 4.33338V7.00005H11.0002Z" fill="white"></path></g><defs><clipPath id="clip0_287_5551"><rect width="12.8" height="12.8" fill="white" transform="translate(0.600098 0.600052)"></rect></clipPath></defs></svg>
            </div>
            <div class="data_item-number">
              167
            </div>
          </div>
          <p class="profile_preview-data_item-text">дней до конца подписки</p>
        </div>
        <div v-if="objDataTip.daysEndSubscription" class="profile_preview-data_box-tip">Количество оставшихся дней оплаченного периода подписки</div>
      </div>
      <div class="profile_preview-data_box"
        @mouseover="objDataTip.discount = true" 
        @mouseleave="objDataTip.discount = false">
        <div class="profile_preview-data_item">
          <div class="DF">
            <div class="data_item-num">
              %
            </div>
          </div>
          <p class="profile_preview-data_item-text">персональная скидка</p>
        </div>
        <div v-if="objDataTip.discount" class="profile_preview-data_box-tip">Ваша персональная скидка, которая действует от вашей базовой стоимости подписки</div>
      </div>
      <div class="profile_preview-data_box"
        @mouseover="objDataTip.clubPrice = true" 
        @mouseleave="objDataTip.clubPrice = false">
        <div class="profile_preview-data_item">
          <div class="DF">
            <div class="data_item-number">
              1300₽
            </div>
          </div>
          <p class="profile_preview-data_item-text">базовая цена клуба</p>
        </div>
        <div v-if="objDataTip.clubPrice" class="profile_preview-data_box-tip">Ваша базовая стоимость подписки без учета скидок и других бонусов</div>
      </div>
      <div class="profile_preview-link">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M21.0295 18.9706C20.4835 18.4248 19.743 18.1182 18.9709 18.1182C18.1988 18.1182 17.4583 18.4248 16.9122 18.9706L14.8529 21.0293C14.3068 21.5754 14 22.316 14 23.0883C14 23.8606 14.3068 24.6012 14.8529 25.1473C15.3989 25.6934 16.1396 26.0002 16.9119 26.0002C17.6841 26.0002 18.4248 25.6934 18.9709 25.1473L20.0002 24.118" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.9707 21.0293C19.5168 21.5752 20.2573 21.8818 21.0294 21.8818C21.8015 21.8818 22.542 21.5752 23.088 21.0293L25.1474 18.9707C25.6935 18.4246 26.0002 17.6839 26.0002 16.9117C26.0002 16.1394 25.6935 15.3987 25.1474 14.8527C24.6013 14.3066 23.8606 13.9998 23.0884 13.9998C22.3161 13.9998 21.5755 14.3066 21.0294 14.8527L20 15.882" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
    </div>
    <div v-if="authStore.data.auth" class="profile_info">
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
      <div v-if="objNav.portfolio" class="DF">
        <div class="profile-body">
          <div class="profile-body_item DF JCC AIC">
            <div class="profile-body_item-text">Здесь не хватает вашей работы! Добавим?</div>
            <div class="profile-body_item-img" @click="objModal.activeWorkModal = true">
              <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.7364" cy="20.3966" r="20" fill="white"></circle><circle cx="20.8925" cy="20.2921" r="20" fill="white"></circle><path d="M20.8925 15.2921V25.2921M15.8925 20.2921H25.8925" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
          </div>
        </div>
      </div>
      <div v-if="objNav.satellites" class="DF">
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
              <div class="material-blur_action" @click="objModal.activeModalAddPost = true">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M23.0915 14.4886L17.9371 19.6429C17.6708 19.9089 17.4891 20.2477 17.4151 20.6168L16.939 23L19.3222 22.523C19.6912 22.4492 20.0296 22.2683 20.296 22.0019L25.4504 16.8475C25.6053 16.6926 25.7282 16.5087 25.812 16.3063C25.8958 16.104 25.939 15.8871 25.939 15.668C25.939 15.449 25.8958 15.2321 25.812 15.0297C25.7282 14.8273 25.6053 14.6434 25.4504 14.4886C25.2955 14.3337 25.1116 14.2108 24.9093 14.127C24.7069 14.0431 24.49 14 24.2709 14C24.0519 14 23.835 14.0431 23.6326 14.127C23.4302 14.2108 23.2464 14.3337 23.0915 14.4886Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M23.6055 23V25C23.6055 25.3537 23.465 25.6928 23.2149 25.9428C22.9649 26.1929 22.6258 26.3334 22.2721 26.3334H14.9388C14.5852 26.3334 14.246 26.1929 13.996 25.9428C13.7459 25.6928 13.6055 25.3537 13.6055 25V17.6667C13.6055 17.3131 13.7459 16.9739 13.996 16.7239C14.246 16.4738 14.5852 16.3334 14.9388 16.3334H16.9388" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
              <div class="material-blur_action blur_action-margin_fix">
                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.7993" cy="20" r="20" fill="white"></circle><path d="M23.0243 15.025V16.85H18.5743V15.025H23.0243ZM17.1493 14.75V16.85H15.2993C14.9399 16.85 14.6493 17.1406 14.6493 17.5V18C14.6493 18.1516 14.7727 18.275 14.9243 18.275H15.7259L16.1042 25.3039C16.1042 25.3041 16.1042 25.3043 16.1042 25.3044C16.1332 25.917 16.6397 26.4 17.2524 26.4H24.3462C24.9605 26.4 25.4655 25.9185 25.4944 25.3043C25.4945 25.3042 25.4945 25.304 25.4945 25.3039L25.8727 18.275H26.6743C26.8259 18.275 26.9493 18.1516 26.9493 18V17.5C26.9493 17.1406 26.6587 16.85 26.2993 16.85H24.4493V14.75C24.4493 14.1156 23.9337 13.6 23.2993 13.6H18.2993C17.6649 13.6 17.1493 14.1156 17.1493 14.75ZM24.4457 18.275L24.0838 24.975H17.5149L17.153 18.275H24.4457Z" fill="black" stroke="black" stroke-width="0.3"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="objNav.yourData" :class="windowSizeStore.objAdaptive.mobile || windowSizeStore.objAdaptive.currentSize < 1330 ? 'DB' : 'DF'">
        <div class="info-yourData_block">
          <div class="info-yourData_block_item">
            <p class="item-texts">Имя</p>
            <input type="text" v-model="objAuth.user.account.account_name" class="item-input">
          </div>
          <div class="info-yourData_block_item">
            <p class="item-texts">Фамилия</p>
            <input type="text" v-model="objAuth.user.account.account_name" class="item-input">
          </div>
          <div class="info-yourData_block_item">
            <div class="DF JCSB">
              <p class="item-texts">Название аккаунта</p>
              1/15
            </div>
            <input type="text" v-model="objAuth.user.account.account_name" class="item-input">
          </div>
          <div class="info-yourData_block_item">
            <p class="item-texts">Страна проживания</p>
            <input type="text" v-model="objAuth.user.account.account_name" class="item-input">
          </div>
          <div class="info-yourData_block_item">
            <p class="item-texts">Город проживания</p>
            <input type="text" v-model="objAuth.user.account.account_name" class="item-input">
          </div>
          <div class="info-yourData_block_item">
            <p class="item-texts">День рождения</p>
            <input type="text" v-model="objAuth.user.account.account_name" class="item-input">
          </div>
          <button @click="handlerSave" :class="objButtonSave.buttonSave ? 'info-yourData_save' : 'DN'">Сохранить изменения</button>
        </div>
        <div class="info-yourData_block">
          <div class="info-yourData_block_item">
            <p class="item-texts">Ваш telegram-аккаунт</p>
            <input type="text" class="item-input">
            <div class="field_show DF">
              <div class="field_show-box" @click="handlerTgShowBox">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="2" fill="url(#paint0_linear_287_7764)"></rect><path d="M4 8.04545L6.97143 11L12 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><defs><linearGradient id="paint0_linear_287_7764" x1="0" y1="16" x2="16" y2="16" gradientUnits="userSpaceOnUse"><stop stop-color="#7000FF"></stop><stop offset="1" stop-color="#0500FF"></stop></linearGradient></defs></svg>
              </div>
              <p class="field_show-text">Показать в профиле</p>
            </div>
          </div>
          <div class="info-yourData_block_item">
            <p class="item-texts">Ваша почта</p>
            <input type="text" class="item-input">
            <div class="field_show DF">
              <div class="field_show-box" @click="handlerEmailShowBox">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="2" fill="url(#paint0_linear_287_7764)"></rect><path d="M4 8.04545L6.97143 11L12 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><defs><linearGradient id="paint0_linear_287_7764" x1="0" y1="16" x2="16" y2="16" gradientUnits="userSpaceOnUse"><stop stop-color="#7000FF"></stop><stop offset="1" stop-color="#0500FF"></stop></linearGradient></defs></svg>
              </div>
              <p class="field_show-text">Показать в профиле</p>
            </div>
          </div>
          <div class="info-yourData_block_item">
            <p class="item-texts">Ваше описание о себе</p>
            <textarea 
              class="info-yourData_block_item-aboutYou" 
              
              @input="(e) => {objNewPost.post.desc = e.target.textContent}">
            </textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalAddMaterial
    v-if="objModal.activeModalAddPost"
    @closeModal="(close) => objModal.activeModalAddPost = close"
    :activeModal="objModal.activeModalAddPost"/>
  <ModalAddWork 
    v-if="objModal.activeWorkModal"
    @closeModal="(close) => objModal.activeWorkModal = close"
    :activeModal="objModal.activeWorkModal"/>
</template>