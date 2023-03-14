<script setup>
  import SideBar from '@/components/SideBar/SideBar.vue'

  import { getParamsPageStore } from '@/stores/paramsPageStore'

  import { defineAsyncComponent, reactive } from 'vue'
  import { onBeforeRouteLeave } from 'vue-router'

  const Materials = defineAsyncComponent(
    () => import('@/components/Materials/Materials.vue')
  )

  const ModalAddMaterial = defineAsyncComponent(
    () => import('@/components/ModalAddMaterial/ModalAddMaterial.vue')
  )

  const ModalAddWork = defineAsyncComponent(
    () => import('@/components/modalAddWork/ModalAddWork.vue')
  )

  const ModalBlockedMaterial = defineAsyncComponent(
    () => import('@/components/ModalBlockedMaterial/ModalBlockedMaterial.vue')
  )
  
  window.scrollTo(0,0);

  const paramsPageStore = getParamsPageStore()

  onBeforeRouteLeave(async () => {
    paramsPageStore.objParamsPage.page = 1
    paramsPageStore.objParamsPage.active_tags = []
    paramsPageStore.objParamsPage.search = ''
    paramsPageStore.objParamsPage.date_last_material = ''
    paramsPageStore.objParamsPage.toggle_favorite = false
    paramsPageStore.objParamsPage.toggle_unfinished = false
  }) 

  const objModal = reactive({
    activeMaterialModal: false,
    activeWorkModal: false,
    activeModalBlocked: false
  })
</script>
<template lang="">
  <div class="DF">
    <SideBar
      @showMaterialModal="(active) => objModal.activeMaterialModal = active"
      @showWorkModal="(active) => objModal.activeWorkModal = active"/>
    <Materials
      @showMaterialModal="(active) => objModal.activeMaterialModal = active"
      @showBlockedModal="(active) => objModal.activeModalBlocked = active"/>
  </div>
  
  <ModalAddMaterial 
    v-if="objModal.activeMaterialModal"
    @closeModal="(close) => objModal.activeMaterialModal = close"
    :activeModal="objModal.activeMaterialModal"/>

  <ModalAddWork 
    v-if="objModal.activeWorkModal"
    @closeModal="(close) => objModal.activeWorkModal = close"
    :activeModal="objModal.activeWorkModal"/>
    
  <ModalBlockedMaterial
    v-if="objModal.activeModalBlocked"
    @closeModal="(close) => objModal.activeModalBlocked = close"
    :activeModal="objModal.activeModalBlocked"/>
</template>
