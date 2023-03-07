<script setup>
  import SideBar from '@/components/SideBar/SideBar.vue'
  import VButtonShowMore from '@/components/VButtonShowMore/VButtonShowMore.vue'

  import { getWorkStore } from '@/stores/workStore'
  import { getApi } from '@/API/api.js'

  import { reactive } from 'vue'
 
  import './style.css'
  import './media-style.css'
  
  const useWorkStore = getWorkStore()
  const useApi = getApi()

  window.scrollTo(0,0);

  const objParamsPage = reactive({
    page: 1,
    idLastMaterial: null
  })

  setWorks()

  async function setWorks() {
    await useApi.getWorks(objParamsPage)
  }

  async function handlerShowMore() {
    objParamsPage.page++
    objParamsPage.idLastMaterial = useWorkStore.data.works[useWorkStore.data.works.length - 1].id

    await useApi.getWorks(objParamsPage)
  }
</script>

<template>
  <div class="DF">
    <SideBar/>
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
</template>