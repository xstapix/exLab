<script setup>
  import SideBar from '@/components/SideBar/SideBar.vue'

  import { getWindowSizeStore } from '@/stores/windowSizeStore' 
  
  import { getApi } from '@/shared/API/api.js'

  import { reactive } from 'vue';

  import './style.css'
  import '@/pages/lk/style.css'
  import '@/pages/lk/media-style.css'

  window.scrollTo(0,0);
  
  const windowSizeStore = getWindowSizeStore()
  const api = getApi()

  const objProfileTabs = reactive({
    card: true,
    data: false,
  })

  const objDetailUser = reactive({
    detailUser: null
  })

  const objNav = reactive({
    portfolio: true, 
    satellites: false,
    yourData: false
  })

  setDetailUser()

  async function setDetailUser() {
    await api.getDetailUser(null)
    objDetailUser.detailUser = await api.getDetailUser(null)
    console.log(objDetailUser.detailUser);
  }

  const handlerProfileTabs = (booleanCard, booleanData) => {
    objProfileTabs.card = booleanCard
    objProfileTabs.data = booleanData
  }
</script>

<template>
  <div v-if="objDetailUser.detailUser" :class="windowSizeStore.objAdaptive.mobile ? 'DB' : 'DF'">
    <SideBar/>
    <div class="detail_user"
    :class="windowSizeStore.objAdaptive.currentSize > 1000 ? 'DB' : windowSizeStore.objAdaptive.currentSize > 680 ? 'DF' : 'DF FDC'">
    <div v-if="windowSizeStore.objAdaptive.tablet || windowSizeStore.objAdaptive.desktop" class="profile_preview DF FDC JCSB">
      <div>
        <div class="profile_preview-photo DF JCC AIC">
          <div class="profile_preview-img">
            <img :src="objDetailUser.detailUser.img" alt="">
          </div>
          <div class="profile_preview-photo_line">
            <div class="preview-photo_line-item">
              <span v-html="objDetailUser.detailUser.line[0]"></span>
            </div>
            <div class="preview-photo_line-item">
              <span v-html="objDetailUser.detailUser.line[1]"></span>
            </div>
            <div class="preview-photo_line-item">
              <span v-html="objDetailUser.detailUser.line[2]"></span>
            </div>
            <div class="preview-photo_line-item">
              <span v-html="objDetailUser.detailUser.line[3]"></span>
            </div>
          </div>
          <div class="profile_preview-photo_point">
            <div class="preview-photo_point-item" :class="{point_active: objDetailUser.detailUser.points[0]}">
              <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="#343437"></circle></svg>
            </div>
            <div class="preview-photo_point-item" :class="{point_active: objDetailUser.detailUser.points[1]}">
              <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="#343437"></circle></svg>
            </div>
            <div class="preview-photo_point-item" :class="{point_active: objDetailUser.detailUser.points[2]}">
              <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="#343437"></circle></svg>
            </div>
            <div class="preview-photo_point-item" :class="{point_active: objDetailUser.detailUser.points[3]}">
              <svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="#343437"></circle></svg>
            </div>
          </div>
        </div>
        <div class="profile_preview-name">
          <p class="profile_preview-name_text">{{objDetailUser.detailUser.name}}</p>
          <p class="profile_preview-name_desc">
            {{ objDetailUser.detailUser.login }} / {{ objDetailUser.detailUser.stark }}
          </p>
        </div>
        <div class="profile_preview-tabs DF">
          <div class="profile_preview-tabs_item" 
            :class="{tabs_item_active: objProfileTabs.card}"
            @click="handlerProfileTabs(true, false)">Визитка</div>
          <div 
            class="profile_preview-tabs_item" 
            :class="{tabs_item_active: objProfileTabs.data}"
            @click="handlerProfileTabs(false, true)">Данные</div>
        </div>
        <div v-if="objProfileTabs.card">
          <div class="profile_preview-card DF FDC JCC AIC">
            <p class="profile_preview-card_text">Загрузите видео о себе для посетителей вашей страницы.</p>
            <p class="profile_preview-card_text card_text-tip">(mp4, прямоугольный формат 16:9, до 1 минуты)</p>
            <div>
              <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20.156" cy="20.2919" r="20" fill="white"></circle><path d="M20.156 15.2919V25.2919M15.156 20.2919H25.156" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
          </div>
          <div v-if="objDetailUser.detailUser" class="profile_preview-about_you">{{ objDetailUser.detailUser.about_you }}</div>
        </div>
        <div v-if="objProfileTabs.data" class="detail_user-data">
          <div class="user-data_item DF AIC">
            <div class="user-data_item-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M20 20.7461C21.103 20.7461 22 19.8491 22 18.7461C22 17.6431 21.103 16.7461 20 16.7461C18.897 16.7461 18 17.6431 18 18.7461C18 19.8491 18.897 20.7461 20 20.7461ZM20 17.7461C20.5515 17.7461 21 18.1946 21 18.7461C21 19.2976 20.5515 19.7461 20 19.7461C19.4485 19.7461 19 19.2976 19 18.7461C19 18.1946 19.4485 17.7461 20 17.7461Z" fill="black"></path><path d="M20 17.7461C20.5515 17.7461 21 18.1946 21 18.7461C21 19.2976 20.5515 19.7461 20 19.7461C19.4485 19.7461 19 19.2976 19 18.7461C19 18.1946 19.4485 17.7461 20 17.7461Z" fill="black"></path><path d="M19.565 27.6067C19.6919 27.6974 19.844 27.7461 20 27.7461C20.156 27.7461 20.3081 27.6974 20.435 27.6067C20.663 27.4455 26.0217 23.5762 25.9999 18.7461C25.9999 15.4379 23.3082 12.7461 20 12.7461C16.6918 12.7461 14.0001 15.4379 14.0001 18.7424C13.9783 23.5762 19.337 27.4455 19.565 27.6067ZM20 14.2461C22.4817 14.2461 24.5 16.2644 24.5 18.7499C24.5157 22.0784 21.209 25.0672 20 26.0475C18.7918 25.0664 15.4843 22.0769 15.5 18.7461C15.5 16.2644 17.5183 14.2461 20 14.2461Z" fill="black"></path></svg>
            </div>
            <div class="user-data_item-text">{{objDetailUser.detailUser.country}}/{{ objDetailUser.detailUser.city }}</div>
          </div>
          <a href="https://t.me/va_lera_01" target="_blank" class="user-data_item DF AIC">
            <div class="user-data_item-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M25.8064 14.4363C25.8064 14.4363 27.1015 13.9313 26.9936 15.1578C26.9576 15.6628 26.6339 17.4303 26.382 19.3421L25.5186 25.0053C25.5186 25.0053 25.4467 25.8349 24.7991 25.9792C24.1516 26.1235 23.1803 25.4742 23.0004 25.3299C22.8565 25.2217 20.3023 23.5985 19.4029 22.8049C19.151 22.5885 18.8632 22.1556 19.4388 21.6506L23.2162 18.0435C23.6479 17.6106 24.0796 16.6006 22.2809 17.8271L17.2444 21.2539C17.2444 21.2539 16.6688 21.6146 15.5895 21.2899L13.2511 20.5685C13.2511 20.5685 12.3877 20.0274 13.8627 19.4863C17.4602 17.791 21.8852 16.0595 25.8064 14.4363Z" fill="black"></path></svg>
            </div>
            <div class="user-data_item-text">{{  objDetailUser.detailUser.tg_name }}</div>
          </a>
          <div class="DF AIC">
            <div class="user-data_item-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M24.6668 14.5667H15.3335C14.7765 14.5667 14.2424 14.7879 13.8486 15.1817C13.4547 15.5756 13.2335 16.1097 13.2335 16.6667V23.3333C13.2335 23.8903 13.4547 24.4244 13.8486 24.8182C14.2424 25.2121 14.7765 25.4333 15.3335 25.4333H24.6668C25.2238 25.4333 25.7579 25.2121 26.1518 24.8182C26.5456 24.4244 26.7668 23.8903 26.7668 23.3333V16.6667C26.7668 16.1097 26.5456 15.5756 26.1518 15.1817C25.7579 14.7879 25.2238 14.5667 24.6668 14.5667ZM20.0002 19.0416L16.08 16.1H23.9203L20.0002 19.0416ZM15.3335 23.9C15.1832 23.9 15.0391 23.8403 14.9328 23.734C14.8265 23.6277 14.7668 23.4836 14.7668 23.3333V17.0333L19.5402 20.6133C19.6729 20.7129 19.8343 20.7667 20.0002 20.7667C20.166 20.7667 20.3275 20.7129 20.4602 20.6133L25.2335 17.0333V23.3333C25.2335 23.4836 25.1738 23.6277 25.0675 23.734C24.9613 23.8403 24.8171 23.9 24.6668 23.9H15.3335Z" fill="black" stroke="black" stroke-width="0.2"></path></svg>
            </div>
            <div class="user-data_item-text">{{ objDetailUser.detailUser.email_text }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="windowSizeStore.objAdaptive.mobile && objDetailUser.detailUser.video" class="profile_preview-modil DF FDC JCC">
      <div class="preview-modil_card">
      </div>
      <div class="profile_preview-modil_profile DF AIC">
        <div class="modil_profile-img">
          <img :src="objDetailUser.detailUser.img" alt="">
        </div>
        <div class="modil_profile-text">
          <div class="modil_profile-text_name">{{ objDetailUser.detailUser.name }}</div>
          <div class="modil_profile-text_stark">{{ objDetailUser.detailUser.login }} / {{ objDetailUser.detailUser.stark }}</div>
        </div>
      </div>
    </div>
    <div v-if="windowSizeStore.objAdaptive.mobile && objDetailUser.detailUser.video" class="profile_preview-about_you">{{ objDetailUser.detailUser.about_you }}</div>
    <div v-if="windowSizeStore.objAdaptive.mobile && !objDetailUser.detailUser.video">
      <div class="detail_user-photo DF JCC AIC">
        <div class="profile_preview-img">
          <img :src="objDetailUser.detailUser.img" alt="">
        </div>
      </div>
      <div class="profile_preview-name">
        <p class="profile_preview-name_text">{{objDetailUser.detailUser.name}}</p>
        <p class="profile_preview-name_desc">
          {{objDetailUser.detailUser.login}} / {{objDetailUser.detailUser.stark}}
        </p>
      </div>
      <div class="profile_preview-about_you">{{ objDetailUser.detailUser.about_you }}</div>
    </div>
    <div v-if="windowSizeStore.objAdaptive.mobile && objDetailUser.detailUser" class="profile_preview-modil_data">
      <div class="data_point-item DF AIC">
        <div class="data_point-item_icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M20 20.7461C21.103 20.7461 22 19.8491 22 18.7461C22 17.6431 21.103 16.7461 20 16.7461C18.897 16.7461 18 17.6431 18 18.7461C18 19.8491 18.897 20.7461 20 20.7461ZM20 17.7461C20.5515 17.7461 21 18.1946 21 18.7461C21 19.2976 20.5515 19.7461 20 19.7461C19.4485 19.7461 19 19.2976 19 18.7461C19 18.1946 19.4485 17.7461 20 17.7461Z" fill="black"></path><path d="M20 17.7461C20.5515 17.7461 21 18.1946 21 18.7461C21 19.2976 20.5515 19.7461 20 19.7461C19.4485 19.7461 19 19.2976 19 18.7461C19 18.1946 19.4485 17.7461 20 17.7461Z" fill="black"></path><path d="M19.565 27.6067C19.6919 27.6974 19.844 27.7461 20 27.7461C20.156 27.7461 20.3081 27.6974 20.435 27.6067C20.663 27.4455 26.0217 23.5762 25.9999 18.7461C25.9999 15.4379 23.3082 12.7461 20 12.7461C16.6918 12.7461 14.0001 15.4379 14.0001 18.7424C13.9783 23.5762 19.337 27.4455 19.565 27.6067ZM20 14.2461C22.4817 14.2461 24.5 16.2644 24.5 18.7499C24.5157 22.0784 21.209 25.0672 20 26.0475C18.7918 25.0664 15.4843 22.0769 15.5 18.7461C15.5 16.2644 17.5183 14.2461 20 14.2461Z" fill="black"></path></svg>
        </div>
        <p>{{objDetailUser.detailUser.country}} / {{objDetailUser.detailUser.city}}</p>
      </div>
      <a href="https://t.me/va_lera_01" target="_blank" class="data_point-item DF AIC">
        <div class="data_point-item_icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M25.8064 14.4363C25.8064 14.4363 27.1015 13.9313 26.9936 15.1578C26.9576 15.6628 26.6339 17.4303 26.382 19.3421L25.5186 25.0053C25.5186 25.0053 25.4467 25.8349 24.7991 25.9792C24.1516 26.1235 23.1803 25.4742 23.0004 25.3299C22.8565 25.2217 20.3023 23.5985 19.4029 22.8049C19.151 22.5885 18.8632 22.1556 19.4388 21.6506L23.2162 18.0435C23.6479 17.6106 24.0796 16.6006 22.2809 17.8271L17.2444 21.2539C17.2444 21.2539 16.6688 21.6146 15.5895 21.2899L13.2511 20.5685C13.2511 20.5685 12.3877 20.0274 13.8627 19.4863C17.4602 17.791 21.8852 16.0595 25.8064 14.4363Z" fill="black"></path></svg>
        </div>
        <p>{{objDetailUser.detailUser.tg_name}}</p>
      </a>
      <div class="data_point-item DF AIC">
        <div class="data_point-item_icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M24.6668 14.5667H15.3335C14.7765 14.5667 14.2424 14.7879 13.8486 15.1817C13.4547 15.5756 13.2335 16.1097 13.2335 16.6667V23.3333C13.2335 23.8903 13.4547 24.4244 13.8486 24.8182C14.2424 25.2121 14.7765 25.4333 15.3335 25.4333H24.6668C25.2238 25.4333 25.7579 25.2121 26.1518 24.8182C26.5456 24.4244 26.7668 23.8903 26.7668 23.3333V16.6667C26.7668 16.1097 26.5456 15.5756 26.1518 15.1817C25.7579 14.7879 25.2238 14.5667 24.6668 14.5667ZM20.0002 19.0416L16.08 16.1H23.9203L20.0002 19.0416ZM15.3335 23.9C15.1832 23.9 15.0391 23.8403 14.9328 23.734C14.8265 23.6277 14.7668 23.4836 14.7668 23.3333V17.0333L19.5402 20.6133C19.6729 20.7129 19.8343 20.7667 20.0002 20.7667C20.166 20.7667 20.3275 20.7129 20.4602 20.6133L25.2335 17.0333V23.3333C25.2335 23.4836 25.1738 23.6277 25.0675 23.734C24.9613 23.8403 24.8171 23.9 24.6668 23.9H15.3335Z" fill="black" stroke="black" stroke-width="0.2"></path></svg>
        </div>
        <p>{{objDetailUser.detailUser.email_text}}</p>
      </div>
    </div>
    <div v-if="objDetailUser.detailUser" class="profile_info">
      <nav class="profile_info-nav">
        <ul class="DF">
          <li v-if="objDetailUser.detailUser.portfolio.length > 0" @click="handlerNav" 
            class="profile_info-nav-paragraph" 
            id="portfolio"
            :class="objNav.portfolio ? 'paragraph_active' : ''">Портфолио</li>
          <li v-if="objDetailUser.detailUser.portfolio.lenght > 0" @click="handlerNav" 
            class="profile_info-nav-paragraph"
            id="satellites"
            :class="objNav.satellites ? 'paragraph_active' : ''">Ваши спутники</li>
        </ul>
      </nav>
      <div v-if="objNav.portfolio" class="profile-body">
        <div class="profile-body_item">
          <div class="profile-body_item-bgk" style="background-image: url('https://kronadev.ru/upload/resize_cache/iblock/8b8/500_500_2/mbukeulj0npgbd6aden4kx1j4i7pmf1u.png')"></div>
        </div>
        <div class="profile-body_item">
          <div class="profile-body_item-bgk" style="background-image: url('https://kronadev.ru/upload/resize_cache/iblock/8b8/500_500_2/mbukeulj0npgbd6aden4kx1j4i7pmf1u.png')"></div>
        </div>
        <div class="profile-body_item">
          <div class="profile-body_item-bgk" style="background-image: url('https://kronadev.ru/upload/resize_cache/iblock/8b8/500_500_2/mbukeulj0npgbd6aden4kx1j4i7pmf1u.png')"></div>
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
            <div @click="objModal.activeMaterialModal = true" class="add_post-img">
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
    </div>
  </div>
  </div>
</template>