<script setup>
  import {getMethods} from '@/components/methods.js'
  import {reactive,onBeforeMount, ref, watch} from 'vue'
  import {useStore} from '@/stores/postStore'
  
  import './style.css'

  const useMethod = getMethods()

useMethod.getTags();

    // await useMethod.getPosts()




  const postsStore = useStore()
  
  const state = reactive({
    activeTags: [],
    arrTags: postsStore.data.tags,
    arrPosts: postsStore.data.posts
  })

  watch(state.arrTags, (newValue, oldValue) => {
  console.log(state)
})

  // changeTags()
  
  // const handlerTag = (tagId, index) => {
  //   if (index === 0) {
  //     for (let item in state.arrTags) {
  //       if (state.arrTags[item].active) {
  //         state.arrTags[item].active = false
  //       }
  //       state.activeTags = []
  //     }
  //     state.arrTags[0].active = true
    
  //     postsStore.changePostsList(state.arrPosts)
  //   } else {
  //     state.arrTags[index].active = !state.arrTags[index].active

  //     if (! state.arrTags[index].active) {
  //       state.activeTags = state.activeTags.value.filter(e => e !== tagId)
  //     } else {
  //       state.activeTags.push(tagId)
  //       state.arrTags[0].active = false
  //     }

  //     let filteredPosts = []
  
  //     for (let item in state.arrPosts) {
  //       for (let tag in state.activeTags) {
  //         if (state.arrPosts[item].tags.includes(state.activeTags[tag])) {
  //           filteredPosts.push(state.arrPosts[item]);
  //         }
  //       }
  //     }

  //     postsStore.changePostsList(new Set(filteredPosts))
  //   }
  // }
  
  console.log(state.arrTags)

  function changeTags() {
    for (let item in state.arrTags) {
      state.arrTags[item].active = false
    }

    state.arrTags.unshift({ id: 30, tag: 'Все', active: true })
  }
</script>

<template>
  <div class="filterBody">

    sdfsdfdsf
    <p 
      class="tag" 
      v-for="(tag, index) in state.arrTags"
      :class="{active: tag.active}"
      :key="tag.id"
      @click="handlerTag(tag.id, index)">{{tag.tag}}</p>
  </div>
  gf
  gf
  g
</template>