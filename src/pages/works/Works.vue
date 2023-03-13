<script setup>
  import SideBar from '@/components/SideBar/SideBar.vue'
  import VButtonShowMore from '@/ui/VButtonShowMore/VButtonShowMore.vue'

  import { getWorkStore } from '@/stores/workStore'
  import { getApi } from '@/shared/API/api.js'

  import { reactive, defineAsyncComponent } from 'vue'
 
  import './style.css'
  import './media-style.css'

  const ModalAddMaterial = defineAsyncComponent(
    () => import('@/components/ModalAddMaterial/ModalAddMaterial.vue')
  )

  const ModalAddWork = defineAsyncComponent(
    () => import('@/components/modalAddWork/ModalAddWork.vue')
  )
  
  const useWorkStore = getWorkStore()
  const api = getApi()

  window.scrollTo(0,0);

  const objParamsPage = reactive({
    page: 1,
    idLastMaterial: null
  })

  const objModal = reactive({
    activeMaterialModal: false,
    activeWorkModal: false
  })

  setWorks()

  async function setWorks() {
    await api.getWorks(objParamsPage)
  }

  async function handlerShowMore() {
    objParamsPage.page++
    objParamsPage.idLastMaterial = useWorkStore.data.works[useWorkStore.data.works.length - 1].id

    await api.getWorks(objParamsPage)
  }
</script>

<template>
  <div class="DF">
    <SideBar
      @showMaterialModal="(active) => objModal.activeMaterialModal = active"
      @showWorkModal="(active) => objModal.activeWorkModal = active"/>
    <section v-if="useWorkStore.data.works" class="works-body">
      <div class="works-content">
        <router-link :to="`/works/${item.id}`" v-for="item in useWorkStore.data.works" 
          :key="item.id"
          class="works-item">
          <div :style="{backgroundImage: item.imgPreview}" :id="item.id" class="works-item_img"></div>
        </router-link>
      </div>
      <VButtonShowMore @click="handlerShowMore"/>
    </section>
  </div>
  <ModalAddMaterial 
    v-if="objModal.activeMaterialModal"
    @closeModal="(close) => objModal.activeMaterialModal = close"
    :activeModal="objModal.activeMaterialModal"/>

  <ModalAddWork 
    v-if="objModal.activeWorkModal"
    @closeModal="(close) => objModal.activeWorkModal = close"
    :activeModal="objModal.activeWorkModal"/>
</template>