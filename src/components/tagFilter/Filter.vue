<script setup>
  import {reactive} from 'vue'
  
  import {getMethods} from '@/methods.js'
  
  import { useParamsPageStore } from '@/stores/paramsPageStore'
  import {useStore} from '@/stores/postStore'
  import { useAuthStore } from '@/stores/authStore'
  
  import './style.css'

  const useMethod = getMethods()
  const postsStore = useStore()
  const authStore = useAuthStore()
  const paramsPageStore = useParamsPageStore()

  const objMaterials = reactive({
    arrTags: [],
    arrPosts: []
  })

  setState()
  
  async function setState() {
    const allTags = await useMethod.getTags()
    objMaterials.arrTags = JSON.parse(JSON.stringify(allTags))
    
    const allPosts = await useMethod.getPosts(paramsPageStore.objParamsPage)
    objMaterials.arrPosts = JSON.parse(JSON.stringify(allPosts))

    objMaterials.arrTags.unshift({ id: 30, tag: 'Все', active: true })
  }

  async function handlerTag(tagId, index) {
    if (index === 0) {
      for (let item in objMaterials.arrTags) {
        if (objMaterials.arrTags[item].active) {
          objMaterials.arrTags[item].active = false
        }
        paramsPageStore.changeActiveTags([])
      }
      objMaterials.arrTags[0].active = true
    
      postsStore.changePostsList(objMaterials.arrPosts)
    } else {
      objMaterials.arrTags[index].active = !objMaterials.arrTags[index].active
      if (!objMaterials.arrTags[index].active) {
        let filterActiveTags= paramsPageStore.objParamsPage.activeTags.filter(e => e !== tagId)

        paramsPageStore.changeActiveTags(filterActiveTags)
      } else {
        let expandOriginalActiveTags = paramsPageStore.objParamsPage.activeTags
        paramsPageStore.changeActiveTags([...expandOriginalActiveTags, tagId])
        objMaterials.arrTags[0].active = false
      }
      if (paramsPageStore.objParamsPage.activeTags.length == 0) {
        objMaterials.arrTags[0].active = true
        postsStore.changePostsList(objMaterials.arrPosts)
      } 

      const newMaterials = await useMethod.getPosts(paramsPageStore.objParamsPage)

      objMaterials.arrPosts = JSON.parse(JSON.stringify(newMaterials))
    }
  }

  async function handlerEnter(e) {
    if (e.code == 'Enter') {
      const newMaterials = await useMethod.getPosts(paramsPageStore.objParamsPage)

      objMaterials.arrPosts = JSON.parse(JSON.stringify(newMaterials))
    }
  }

  async function handlerActionFavorite() {
    paramsPageStore.changeToggleFavorite()
    await useMethod.getPosts(paramsPageStore.objParamsPage)
  }

  async function handlerActionUnfinished() {
    paramsPageStore.changeToggleUnfinished()
    await useMethod.getPosts(paramsPageStore.objParamsPage)
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
          v-model="paramsPageStore.objParamsPage.search">
      </div>
      <div class="tag" 
        v-for="(tag, index) in objMaterials.arrTags"
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
          <div class="filter_actions-img">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.04485 4.02164C9.22991 3.84545 9.47619 3.74805 9.7317 3.74998C9.98722 3.75192 10.232 3.85304 10.4144 4.03201C10.5967 4.21098 10.7025 4.4538 10.7092 4.70923C10.716 4.96467 10.6232 5.21273 10.4506 5.40109L5.20867 11.9567C5.11854 12.0538 5.00975 12.1317 4.88881 12.1858C4.76788 12.2399 4.63728 12.269 4.50483 12.2715C4.37237 12.2739 4.24079 12.2497 4.11793 12.2001C3.99508 12.1505 3.88348 12.0767 3.78981 11.983L0.313605 8.50682C0.216798 8.41661 0.139152 8.30783 0.0852987 8.18697C0.0314452 8.0661 0.00248761 7.93563 0.000153343 7.80333C-0.00218092 7.67103 0.022156 7.53962 0.0717123 7.41693C0.121269 7.29424 0.195029 7.18279 0.288593 7.08922C0.382158 6.99566 0.493609 6.9219 0.616298 6.87234C0.738988 6.82278 0.870402 6.79845 1.0027 6.80078C1.135 6.80312 1.26547 6.83207 1.38634 6.88593C1.5072 6.93978 1.61598 7.01743 1.70619 7.11423L4.4572 9.86393L9.01857 4.05055C9.02675 4.0404 9.03553 4.03075 9.04485 4.02164V4.02164ZM7.83619 10.7744L9.04485 11.983C9.13849 12.0765 9.25001 12.1502 9.37274 12.1996C9.49547 12.249 9.6269 12.2733 9.7592 12.2708C9.89149 12.2684 10.0219 12.2393 10.1427 12.1853C10.2636 12.1314 10.3723 12.0536 10.4624 11.9567L15.7069 5.40109C15.8011 5.30808 15.8756 5.19703 15.926 5.07459C15.9763 4.95215 16.0015 4.82081 15.9999 4.68843C15.9984 4.55605 15.9702 4.42534 15.917 4.3041C15.8638 4.18286 15.7867 4.07359 15.6904 3.9828C15.594 3.89201 15.4804 3.82156 15.3562 3.77568C15.232 3.72979 15.0998 3.7094 14.9676 3.71572C14.8354 3.72205 14.7058 3.75496 14.5865 3.81248C14.4673 3.87001 14.3609 3.95098 14.2736 4.05055L9.71092 9.86393L9.07375 9.22544L7.83487 10.7744H7.83619Z" fill="white"></path></svg>
          </div>
          <p class="filter_actions-text">Показать незавершенные</p>
          <div class="filter_actions-toggle_check" 
            :class="{toggle_check_checked: paramsPageStore.objParamsPage.toggleUnfinished}"
            @click="handlerActionUnfinished">
            <div class="filter_actions-toggle_dot_check" 
              :class="{toggle_dot_check_checked: paramsPageStore.objParamsPage.toggleUnfinished}"></div>
          </div>
        </div>
        <div class="DF AIC filter_actions-item" >
          <div class="filter_actions-img">
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.26936 6.88896C1.07953 5.25931 1.47614 2.81483 3.4592 2C5.44226 1.18517 6.6321 2.81483 7.02871 3.62965C7.42533 2.81483 9.01178 1.18517 10.9948 2C12.9779 2.81483 12.9779 5.25931 11.7881 6.88896C10.5982 8.51862 7.02871 11.7779 7.02871 11.7779C7.02871 11.7779 3.4592 8.51862 2.26936 6.88896Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <p class="filter_actions-text">Показать избранное</p>
          <div class="filter_actions-toggle_favorite"
            :class="{toggle_favorite_checked: paramsPageStore.objParamsPage.toggleFavorite}"
            @click="handlerActionFavorite">
            <div class="filter_actions-toggle_dot_favorite" 
              :class="{toggle_dot_favorite_checked: paramsPageStore.objParamsPage.toggleFavorite}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>