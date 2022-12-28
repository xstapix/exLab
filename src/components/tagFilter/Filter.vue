<script setup>
  import axios from 'axios';
  
  import {ref} from 'vue'
  import {usePostStore} from '@/stores/postStore'
  
  import './style.css'

  const postsStore = usePostStore()
  const arrTags = ref(null)

  getData()
  
  const handlerTag = (e) => {
    if (e === 30) {
      for (const item in arrTags.value) {
        arrTags.value[item].active = false
      }
      arrTags.value[0].active = true
    } else {
      arrTags.value[e+1].active = !arrTags.value[e+1].active
      arrTags.value[0].active = false
    }
    console.log(e);

    // postsStore.posts.filter(item => )
    
  }

  async function getData() {
    await axios.get('https://63385f16937ea77bfdbf1257.mockapi.io/kronaTags')
      .then((res) => arrTags.value = res.data)
      .catch((err) => console.error('Get Error', err))

    for (const item in arrTags.value) {
      arrTags.value[item].active = false
    }

    arrTags.value.unshift({id: 30, tag: 'Все', active: true})
  }


</script>

<template>
  <div class="filterBody">
    <p 
      class="tag" 
      v-for="tag in arrTags"
      :class="{active: tag.active}"
      :key="tag.tag"
      @click="handlerTag(tag.id)">{{tag.tag}}</p>
  </div>
</template>