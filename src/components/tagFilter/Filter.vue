<script setup>
  import axios from 'axios';
  
  import {ref, reactive} from 'vue'
  import {usePostStore} from '@/stores/postStore'
  
  import './style.css'

  const postsStore = usePostStore()
  const activeTags = ref([])
  const arrTags = ref([])
  const arrPosts = ref([])
  const arrTest = reactive({
    posts: []
  })

  getData()
  
  const handlerTag = (tagId, index) => {
    if (index === 0) {
      for (let item in arrTags.value) {
        if (arrTags.value[item].active) {
          arrTags.value[item].active = false
        }
        activeTags.value = []
      }
      arrTags.value[0].active = true
    
      postsStore.overwritePostsList(arrPosts.value)
      console.log(postsStore.posts);
    } else {
      arrTags.value[index].active = !arrTags.value[index].active

      if (!arrTags.value[index].active) {
        activeTags.value = activeTags.value.filter(e => e !== tagId)
      } else {
        activeTags.value.push(tagId)
        arrTags.value[0].active = false
      }

      let filteredPosts = []
  
      for (let item in arrPosts.value) {
        for (let tag in activeTags.value) {
          if (arrPosts.value[item].tags.includes(activeTags.value[tag])) {
            filteredPosts.push(arrPosts.value[item]);
          }
        }
      }

      let r = new Set(filteredPosts);
      console.log(r);
      postsStore.overwritePostsList(r)
      // console.log( new Set(filteredPosts))
    } 

    
    
  }

  async function getData() {
    await axios.get('https://63385f16937ea77bfdbf1257.mockapi.io/kronaTags')
      .then((res) => arrTags.value = res.data)
      .catch((err) => console.error('Get Error', err))

    await axios.get('https://63385f16937ea77bfdbf1257.mockapi.io/kronaPostsList')
      .then((res) => arrPosts.value = res.data)
      .catch((err) => console.error('Get Error', err))

    for (let item in arrTags.value) {
      arrTags.value[item].active = false
    }

    arrTags.value.unshift({id: 30, tag: 'Все', active: true})
    console.log(arrPosts);
    console.log(arrPosts.value);
    console.log(arrTest);
    postsStore.overwritePostsList(arrPosts.value)
  }
</script>

<template>
  <div class="filterBody">
    <p 
      class="tag" 
      v-for="(tag, index) in arrTags"
      :class="{active: tag.active}"
      :key="tag.tag"
      @click="handlerTag(tag.id, index)">{{tag.tag}}</p>
  </div>
</template>