<script setup>
  import {getMethods} from '@/methods.js'
  import {reactive} from 'vue'
  import {useStore} from '@/stores/postStore'
  import { useAuthStore } from '@/stores/authStore'
  
  import './style.css'

  const useMethod = getMethods()
  const postsStore = useStore()
  const authStore = useAuthStore()

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

  const handlerActionCheck = () => {
    document.querySelector('.filter_actions-toggle_check').classList.toggle('toggle_check_checked')
    document.querySelector('.filter_actions-toggle_dot_check').classList.toggle('toggle_dot_check_checked')
  
    const filteredPosts = []
    const toggleActive = document.querySelector('.filter_actions-toggle_dot_check').classList

    if (toggleActive.length === 2) {
      for (let id in state.arrPosts) {
        if (!authStore.data.user.account.viewed.includes(id)) {
          filteredPosts.push(state.arrPosts[id])
        }
      }
      postsStore.changePostsList(filteredPosts)
    } else {
      postsStore.changePostsList(state.arrPosts) 
    }
  }

  const handlerActionFavorite = () => {
    document.querySelector('.filter_actions-toggle_favorite').classList.toggle('toggle_favorite_checked')
    document.querySelector('.filter_actions-toggle_dot_favorite').classList.toggle('toggle_dot_favorite_checked')
    
    const filteredPosts = []
    const toggleActive = document.querySelector('.filter_actions-toggle_dot_favorite').classList
    
    if (toggleActive.length === 2) {
      for (let id in state.arrPosts) {
        if (authStore.data.user.account.favorites.includes(id)) {
          filteredPosts.push(state.arrPosts[id])
        }
      }
      postsStore.changePostsList(filteredPosts)
    } else {
      postsStore.changePostsList(state.arrPosts) 
    }
  }
</script>

<template>
  <div class="filter">
    <div class="filter-body">
      <div class="filter_search DF AIC">
        <div class="filter_search-img">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 11.25L14.25 14.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 12.25C10.1234 12.25 12.25 10.1234 12.25 7.5C12.25 4.87665 10.1234 2.75 7.5 2.75C4.87665 2.75 2.75 4.87665 2.75 7.5C2.75 10.1234 4.87665 12.25 7.5 12.25Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
        <input class="filter_search-input" 
        type="text" 
        :onkeydown="handlerEnter"
        v-model="state.valueInput">
      </div>
      <div class="tag" 
        v-for="(tag, index) in state.arrTags"
        :class="{active: tag.active}"
        :key="tag.id"
        @click="handlerTag(tag.id, index)">
        {{tag.tag}}
        <div class="tag_close_off" :class="{tag_close_on: tag.active}">
          <div class="tag_close-line line_first"></div>
          <div class="tag_close-line line_second"></div>
        </div>
      </div>
      <div class="filter_actions">
        <div class="DF AIC filter_actions-item">
          <div class="filter_actions-img_check"></div>
          <p class="filter_actions-test">Показать незавершенные</p>
          <div class="filter_actions-toggle_check" @click="handlerActionCheck">
            <div class="filter_actions-toggle_dot_check"></div>
          </div>
        </div>
        <div class="DF AIC filter_actions-item" >
          <div class="filter_actions-img_favorite"></div>
          <p class="filter_actions-test">Показать избранное</p>
          <div class="filter_actions-toggle_favorite" @click="handlerActionFavorite">
            <div class="filter_actions-toggle_dot_favorite"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>