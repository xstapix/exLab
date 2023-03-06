<script setup>
  import SideBar from '@/components/SideBar/SideBar.vue'
  import VButtonShowMore from '@/components/VButtonShowMore/VButtonShowMore.vue'

  import { useWorkStore } from '@/stores/workStore'
  import {getMethods} from '@/methods.js'

  import {reactive} from 'vue'
 
  import './style.css'
  import './media-style.css'
  
  const workStore = useWorkStore()
  const useMethod = getMethods()

  const objParamsPage = reactive({
    page: 1,
    idLastMaterial: null
  })

  setWorks()

  async function setWorks() {
    await useMethod.getWorks(objParamsPage)
  }

  async function handlerShowMore() {
    objParamsPage.page++
    objParamsPage.idLastMaterial = workStore.data.works[workStore.data.works.length - 1].id

    await useMethod.getWorks(objParamsPage)
  }

</script>

<template>
  <div class="DF">
    <SideBar/>
    <section v-if="workStore.data.works" class="works-body">
      <div class="works-content">
        <router-link :to="`/works/${item.id}`" v-for="item in workStore.data.works" 
          :key="item.id"
          class="works-item">
          <div :style="{backgroundImage: item.imgPreview}" :id="item.id" class="works-item_img"></div>
        </router-link>
      </div>
      <VButtonShowMore @click="handlerShowMore"/>
    </section>
  </div>
</template>