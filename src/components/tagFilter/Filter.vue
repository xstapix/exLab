<script setup>
  import {getMethods} from '@/components/methods.js'
  import {reactive} from 'vue'
  import {useStore} from '@/stores/postStore'
  
  import './style.css'

  const useMethod = getMethods()
  const postsStore = useStore()

  const state = reactive({
    activeTags: [],
    arrTags: [],
    arrPosts: [],
    valueInput: null
  })

  setState()
  
  async function setState() {
    const allTags = await useMethod.getTags()
    state.arrTags = allTags
    
    const allPosts = await useMethod.getPosts()
    state.arrPosts = allPosts

    changeTags()
  }

  const handlerTag = (tagId, index) => {
    if (index === 0) {
      for (let item in state.arrTags) {
        if (state.arrTags[item].active) {
          state.arrTags[item].active = false
        }
        state.activeTags = []
      }
      state.arrTags[0].active = true
    
      postsStore.changePostsList(state.arrPosts)
    } else {
      state.arrTags[index].active = !state.arrTags[index].active

      if (!state.arrTags[index].active) {
        state.activeTags = state.activeTags.filter(e => e !== tagId)
      } else {
        state.activeTags.push(tagId)
        state.arrTags[0].active = false
      }

      if (state.activeTags.length == 0) {
        state.arrTags[0].active = true
        postsStore.changePostsList(state.arrPosts)
      } else {
        let filteredPosts = []
        let idСontributedPosts = []
    
        for (let item in state.arrPosts) {
          for (let tag in state.activeTags) {
            if (state.arrPosts[item].tags.includes(state.activeTags[tag]) 
              && !idСontributedPosts.includes(state.arrPosts[item].id)) {
              filteredPosts.push(state.arrPosts[item]);
              idСontributedPosts.push(state.arrPosts[item].id)
            }
          }
        }
  
        postsStore.changePostsList(filteredPosts)

      }
    }
  }

  function changeTags() {
    for (let item in state.arrTags) {
      state.arrTags[item].active = false
    }

    state.arrTags.unshift({ id: 30, tag: 'Все', active: true })
  }

  const handlerEnter = (e) => {
    let filteredPosts = []
    let idСontributedPosts = []
    
    if (e.code == 'Enter') {
      for (let item in state.arrPosts) {
        for (let tag in state.activeTags) {
          if (state.arrPosts[item].tags.includes(state.activeTags[tag]) 
            && !idСontributedPosts.includes(state.arrPosts[item].id)) {
            filteredPosts.push(state.arrPosts[item]);
            idСontributedPosts.push(state.arrPosts[item].id)
          }
        }
      }

      for (let item in state.arrPosts) {
        if (!idСontributedPosts.includes(state.arrPosts[item].id)) {
          let postTitle = state.arrPosts[item].title.toLowerCase().split(' ')
          let postPreviewText = state.arrPosts[item].previewText.toLowerCase().split(' ')

          if(postTitle.includes(state.valueInput) || postPreviewText.includes(state.valueInput)){
            filteredPosts.push(state.arrPosts[item])
          }
        }
      }

      postsStore.changePostsList(filteredPosts)
    }
    

  }
</script>

<template>
  <div class="filterBody">
    <input class="search" 
      type="text" 
      placeholder="UX" 
      :onkeydown="handlerEnter"
      v-model="state.valueInput">
    <p class="tag" 
      v-for="(tag, index) in state.arrTags"
      :class="{active: tag.active}"
      :key="tag.id"
      @click="handlerTag(tag.id, index)">{{tag.tag}}</p>
  </div>
</template>