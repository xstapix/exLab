<script setup>
  import { getApi } from '@/shared/API/api.js'

  import SideBar from '@/components/SideBar/SideBar.vue'
  
  import { useRoute, useRouter } from 'vue-router'
  import { reactive, defineAsyncComponent } from 'vue'

  import './style.css'
  import './media-style.css'
  import '@/components/Materials/style.css'
  
  const ModalAddMaterial = defineAsyncComponent(
    () => import('@/components/ModalAddMaterial/ModalAddMaterial.vue')
  )

  const ModalAddWork = defineAsyncComponent(
    () => import('@/components/modalAddWork/ModalAddWork.vue')
  )

  window.scrollTo(0,0);

  const api = getApi()
  const route = useRoute()
  const router = useRouter()

  const objWork = reactive({
    work: null,
    renderKey: 0
  })

  const objModal = reactive({
    activeMaterialModal: false,
    activeWorkModal: false
  })

  setDetailWork(null, route.params.workId)

  async function setDetailWork(direction, workId) {
    if (direction === '+') {   
      objWork.work = await api.getDetailWork(`${Number(workId) + 1}`)
    } else if (direction === '-') {   
      objWork.work = await api.getDetailWork(`${Number(workId) - 1}`)
    } else {
      objWork.work = await api.getDetailWork(`${workId}`)
    }
    console.log(objWork.work);
  }

  const handlerNextWork = () => {
    if (route.params.link) {
      router.push(`/materials/${route.params.link}/work/${Number(objWork.work.id) + 1}`)
    } else {
      router.push(`/works/${Number(objWork.work.id) + 1}`)
    }

    setDetailWork('+', objWork.work.id)
    
    objWork.renderKey++
  }

  const handlerPrewWork = () => {
    if (route.params.link) {
      router.push(`/materials/${route.params.link}/work/${Number(objWork.work.id) - 1}`)
    } else {
      router.push(`/works/${Number(objWork.work.id) - 1}`)
    }

    setDetailWork('-', objWork.work.id)

    objWork.renderKey++
  }

  console.log(objWork.work);
</script>

<template>
  <SideBar
    @showMaterialModal="(active) => objModal.activeMaterialModal = active"
    @showWorkModal="(active) => objModal.activeWorkModal = active"/>
  <section v-if="objWork.work" :key="objWork.renderKey" class="detail-work_active" >
    <div v-if="objWork.work.prev" class="detail-work_arrow-left" @click="handlerPrewWork" >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="white"></circle><path d="M22 14L16 20L22 26" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </div>
    <div v-if="objWork.work.next" class="detail-work_arrow-right" @click="handlerNextWork">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle r="20" transform="matrix(-1 0 0 1 20 20)" fill="white"></circle><path d="M18 14L24 20L18 26" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </div>
    <div class="DF FDC detail-work_content">
      <div v-if="objWork.work.fromLesson.type" class="detail-work_plug">
        <div class="detail-work_box">
          <div class="detail-work_post-preview">
            <div class="DF AIC">
              <div class="post_info_author">
                <img class="post_info_author-img" src="/src/assets/yyhqfinwoon1yvcb6hm7jam67nnus0ec.png" alt="">
              </div>
              <div class="post_info_type">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="black"></circle><path d="M14.6666 23.4055C14.5838 23.4055 14.5166 23.4727 14.5166 23.5555V24.5333C14.5166 24.6162 14.5838 24.6833 14.6666 24.6833H21C21.1694 24.6833 21.3319 24.616 21.4517 24.4962C21.5715 24.3764 21.6388 24.2139 21.6388 24.0444C21.6388 23.875 21.5715 23.7125 21.4517 23.5927L21.3459 23.6985L21.4517 23.5927C21.3319 23.4729 21.1694 23.4055 21 23.4055H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 20.7389C14.5838 20.7389 14.5166 20.8061 14.5166 20.8889V21.8667C14.5166 21.9495 14.5838 22.0167 14.6666 22.0167H24.4444C24.6138 22.0167 24.7764 21.9494 24.8962 21.8296C25.016 21.7098 25.0833 21.5472 25.0833 21.3778C25.0833 21.2084 25.016 21.0459 24.8962 20.926C24.7764 20.8062 24.6138 20.7389 24.4444 20.7389H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 18.0722C14.5838 18.0722 14.5166 18.1393 14.5166 18.2222V19.1999C14.5166 19.2828 14.5838 19.3499 14.6666 19.3499H21.5555C21.6394 19.3499 21.7225 19.3334 21.8 19.3013C21.8775 19.2692 21.948 19.2221 22.0073 19.1628C22.0666 19.1035 22.1137 19.0331 22.1458 18.9555C22.1779 18.878 22.1944 18.795 22.1944 18.7111C22.1944 18.6272 22.1779 18.5441 22.1458 18.4666C22.1137 18.3891 22.0666 18.3186 22.0073 18.2593C21.948 18.2 21.8775 18.1529 21.8 18.1208C21.7225 18.0887 21.6394 18.0722 21.5555 18.0722H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path><path d="M14.6666 15.4055C14.5838 15.4055 14.5166 15.4727 14.5166 15.5555V16.5333C14.5166 16.6162 14.5838 16.6833 14.6666 16.6833H25C25.1694 16.6833 25.3319 16.616 25.4517 16.4962C25.5715 16.3764 25.6388 16.2139 25.6388 16.0444C25.6388 15.875 25.5715 15.7125 25.4517 15.5927C25.3319 15.4729 25.1694 15.4055 25 15.4055H14.6666Z" fill="white" stroke="white" stroke-width="0.3" stroke-linejoin="round"></path></svg>
              </div>
              <div class="post-preview_date">
                <p>{{ objWork.work.fromLesson.date }}</p>
                <p>{{ objWork.work.fromLesson.time }}</p>
              </div>
            </div>
            <a class="post-preview-title">{{ objWork.work.fromLesson.title }}</a>
          </div>
        </div>
        <div class="detail-work_img-body">
          <img :src="objWork.work.imgFull" class="detail-work_img" alt="">
        </div>
        <p class="detail-work_fromAccount">Другие работы к уроку</p>
      </div>
      <div v-if="objWork.work.fromAccount.type">
        <a href="/" class="DF AIC detail-work_author-info">
          <div class="detail-work_author">
            <img :src="objWork.work.fromAccount.author.img" class="detail-work_author-img"/>
          </div>
          <div>
            <div class="detail-work_author-nl DF AIC">
              {{ objWork.work.fromAccount.author.userName }}
              <span class="detail-work_author-level">lvl. {{objWork.work.fromAccount.author.level}}</span>
            </div>
            <div class="detail-work_author-stark">{{ objWork.work.fromAccount.author.stark }}</div>
          </div>
        </a>
        <div class="detail-work_img-body">
          <img :src="objWork.work.imgFull" class="detail-work_img" alt="">
        </div>
        <p class="detail-work_fromAccount">Работы пользователя</p>
      </div>
      <div class="more_work DF FWW">
        <div v-for="work in objWork.work.more_work" class="more_work-item">
          <div class="more_work-item_bg" :class="{item_bg_active: work.id === objWork.work.id}" :style="{backgroundImage: `url(${work.img_preview})`}"></div>
        </div>
      </div>
    </div>
  </section>
  <ModalAddMaterial 
    v-if="objModal.activeMaterialModal"
    @closeModal="(close) => objModal.activeMaterialModal = close"
    :activeModal="objModal.activeMaterialModal"/>

  <ModalAddWork 
    v-if="objModal.activeWorkModal"
    @closeModal="(close) => objModal.activeWorkModal = close"
    :activeModal="objModal.activeWorkModal"/>
</template>