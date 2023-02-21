<script setup>
  import TheSideBar from '@/components/sideBar/TheSideBar.vue'

  import { useParamsPageStore } from '@/stores/paramsPageStore'

  import {defineAsyncComponent} from 'vue'
  import { onBeforeRouteLeave } from 'vue-router'
  
  import './style.css'

  const Materials = defineAsyncComponent(
    () => import('@/components/materials/Materials.vue')
  )
  
  document.body.style.backgroundColor = '#000'
  
  const paramsPageStore = useParamsPageStore()

  onBeforeRouteLeave(async () => {
    paramsPageStore.objParamsPage.page = 1
    paramsPageStore.objParamsPage.active_tags = []
    paramsPageStore.objParamsPage.search = ''
    paramsPageStore.objParamsPage.id_last_material = 0
    paramsPageStore.objParamsPage.toggle_favorite = false
    paramsPageStore.objParamsPage.toggle_unfinished = false
  }) 

</script>
<template lang="">
  <div class="DF">
    <TheSideBar/>
    <Materials/>
  </div>
</template>
