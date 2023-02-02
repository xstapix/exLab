<script setup>
  import {reactive} from 'vue';
  import {getMethods} from '@/methods.js'
  
  import './style.css'

  const props = defineProps({
    activeModal: Boolean
  })
  const emit = defineEmits(['closeModal'])

  const useMethod = getMethods()

  const objModal = reactive({
    loadedImg: false,
    loadedCover: false,
    checkboxImgCover: false,
    nextButton: false,
    newWork: {
      img: null,
      preview: null
    }
  })

  const handlerAddWork = (e) => {
    const file = e.target.files[0];
    
    if (objModal.nextButton) {
      objModal.newWork.preview = file;
      objModal.loadedCover = URL.createObjectURL(file)
    } else {
      objModal.newWork.img = file;
      objModal.loadedImg = URL.createObjectURL(file)
    }
  }

  const handlerClose = () => {
    props.activeModal = false

    objModal.loadedImg = null
    objModal.checkboxImgCover = false
    objModal.nextButton = false
    objModal.loadedCover = false
    objModal.newWork.img = null
    objModal.newWork.preview = null

    emit('closeModal', false)
  }

  const handlerNext = () => {
    objModal.nextButton = true
    objModal.loadedImg = false
  }

  const handlerSendWork = () => {
    let formData = new FormData()
    
    formData.append('method', 'sendWorkImgs')
    formData.append('image', objModal.newWork.img)

    for(let [name, value] of formData) {
      alert(`${name} = ${value}`); // key1=value1, потом key2=value2
    }
    
    // sendWork()

    objModal.addWorkModal = false
    objModal.loadedImg = null
    objModal.checkboxImgCover = false
    objModal.nextButton = false
    objModal.loadedCover = false
    objModal.newWork.img = null
    objModal.newWork.preview = null

    async function sendWork() {
      await useMethod.postWork(form)
        .then((res) => console.log(res))
        .catch((rej) => console.log(rej))
    }
  }

</script>

<template>
  <section :class="props.activeModal ? 'add_work-modal_active' : 'add_work-modal' ">
    <div class="work-modal_body">
      <div class="DF">
        <div>
          <p class="work-modal_body_info-title">{{ objModal.nextButton ? 'Выберите обложку' : 'Выберите работу'}}</p>
          <p class="work-modal_body_info-text"> {{ objModal.nextButton ? 'Обложка будет отображаться в списках работ' : 'Работа будет отображаться при полноэкранном просмотре'}}</p>
          <div v-if="!objModal.nextButton && objModal.loadedImg" class="DF work-modal_body_info-cover">
            <div class="DF">
              <input type="checkbox" id="ImgCover" @click="objModal.checkboxImgCover = !objModal.checkboxImgCover">
              <label for="ImgCover" class="work-modal_body_info-cover_text">Сделать работу обложкой</label>
            </div>
            <div v-if="objModal.checkboxImgCover" :style="{backgroundImage: `url(${objModal.loadedImg})`}" class="work-modal_body_info-cover-img"></div>
          </div>
        </div>
        <div class="work-modal_body-add"
          :style="objModal.loadedImg && !objModal.nextButton ? {backgroundImage: `url(${objModal.loadedImg})`} : objModal.nextButton ? {backgroundImage: `url(${objModal.loadedCover})`} : ''">
          <input type="file" name="img" id="" @change="handlerAddWork" accept="image/png,image/jpeg" class="work-modal_body-add_input">
          <div v-if="!objModal.loadedImg && !objModal.loadedCover" class="work-modal_body-add_icon">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_294_5973)"><path d="M7.26031 10.0841H6.30577H6.30562V9.88412C6.28222 9.88417 6.25928 9.87763 6.23942 9.86526C6.21956 9.85289 6.20358 9.83517 6.19331 9.81415C6.18304 9.79312 6.1789 9.76963 6.18135 9.74636C6.1838 9.72309 6.19276 9.70098 6.20718 9.68256L7.26031 10.0841ZM7.26031 10.0841V13.6716C7.26031 13.8508 7.4061 13.9966 7.58531 13.9966H8.52281C8.70201 13.9966 8.84781 13.8508 8.84781 13.6716V10.0857H9.80562C10.0771 10.0857 10.2287 9.77288 10.0611 9.56029L10.061 9.56015L8.31156 7.34523L8.15406 7.46849L8.31101 7.34453L8.31124 7.34482C8.28088 7.30616 8.24216 7.27489 8.19797 7.25337C8.15363 7.23176 8.10495 7.22053 8.05562 7.22053C8.00629 7.22053 7.95761 7.23176 7.91327 7.25337C7.8691 7.27489 7.83039 7.30614 7.80004 7.34477L7.26031 10.0841Z" fill="white" stroke="white" stroke-width="0.4"></path><path d="M4.30281 7.11213L4.35271 7.0991L4.37102 7.05088L4.58821 6.47901L4.58829 6.4788C4.71906 6.1321 4.90155 5.80815 5.1313 5.5145L5.13142 5.51435C5.35827 5.22325 5.62698 4.96736 5.92881 4.75499C6.55409 4.31532 7.29024 4.08257 8.05879 4.08257C8.82733 4.08257 9.56348 4.31532 10.1888 4.75499C10.4916 4.96803 10.7594 5.22367 10.9862 5.51439L10.9863 5.5145C11.216 5.80806 11.3985 6.13359 11.5293 6.47893L11.7449 7.04918L11.7631 7.09733L11.8129 7.11049L12.4031 7.26663C12.4032 7.26665 12.4033 7.26667 12.4034 7.2667C13.2066 7.48318 13.7682 8.21393 13.7682 9.04663C13.7682 9.53735 13.5771 9.9994 13.2303 10.3462L13.2301 10.3464C13.0601 10.5174 12.8579 10.653 12.6351 10.7453C12.4124 10.8376 12.1736 10.8848 11.9325 10.8841H11.9322H11.3057C11.1817 10.8841 11.0807 10.9852 11.0807 11.1091V12.0466C11.0807 12.1706 11.1817 12.2716 11.3057 12.2716H11.9322C13.7125 12.2716 15.1557 10.8284 15.1557 9.04663C15.1557 7.56971 14.1624 6.32437 12.8089 5.94318C12.0666 4.0433 10.2197 2.69663 8.05879 2.69663C5.89799 2.69663 4.05102 4.04166 3.30868 5.94152C1.95204 6.32118 0.955664 7.56808 0.955664 9.04663C0.955664 10.8284 2.39884 12.2716 4.1791 12.2716H4.80566C4.92964 12.2716 5.03066 12.1706 5.03066 12.0466V11.1091C5.03066 10.9852 4.92964 10.8841 4.80566 10.8841H4.1791C3.67964 10.8841 3.21018 10.6857 2.86022 10.3254C2.51214 9.96696 2.32682 9.48402 2.34311 8.98279C2.35646 8.59147 2.48967 8.22434 2.73135 7.91443C2.97899 7.59865 3.32597 7.36894 3.71085 7.26676C3.7109 7.26675 3.71095 7.26674 3.711 7.26672L4.30281 7.11213Z" fill="white" stroke="white" stroke-width="0.2"></path></g><defs><clipPath id="clip0_294_5973"><rect width="16" height="16" fill="white" transform="translate(0.0556641 0.296631)"></rect></clipPath></defs></svg>
          </div>
          <p v-if="!objModal.loadedImg && !objModal.loadedCover" class="work-modal_body-add_title">Кликнете, чтобы выбрать файл</p>
          <p v-if="!objModal.loadedImg && !objModal.loadedCover" class="work-modal_body-add_text">(png, jpeg/jpg, ширина от 1000px, до 10 МБ)</p>
        </div>
      </div>
      <div class="DF">
        <div @click="handlerClose" 
          class="work-modal_body-close"
          :style="objModal.loadedImg ? {marginRight: '4px'} : ''">
          Отменить отправку
        </div>
        <div v-if="objModal.loadedImg && !objModal.checkboxImgCover && !objModal.nextButton" @click="handlerNext" class="work-modal_body-nextToCover">Далее к обложке</div>
        <div v-if="objModal.checkboxImgCover"  @click="handlerSendWork" class="work-modal_body-nextToCover">Отправить работу</div>
        <div v-if="objModal.nextButton" @click="handlerSendWork" class="work-modal_body-nextToCover">Отправить работу</div>
      </div>
    </div>
  </section>
</template>