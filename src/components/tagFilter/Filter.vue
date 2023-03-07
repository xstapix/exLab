<script setup>
  import { reactive } from 'vue'
  
  import { getApi } from '@/API/api.js'
  
  import { getParamsPageStore } from '@/stores/paramsPageStore'
  import { useStore } from '@/stores/postStore'
  import { getAuthStore } from '@/stores/authStore'
  import { getWindowSizeStore } from '@/stores/windowSizeStore' 
  
  import './style.css'
  import './media-style.css'

  const useApi = getApi()
  const postsStore = useStore()
  const authStore = getAuthStore()
  const paramsPageStore = getParamsPageStore()
  const windowSizeStore = getWindowSizeStore()

  const objMaterials = reactive({
    arrTags: [],
    arrPosts: [],
    showTagsAdaptive: false
  })

  setState()
  
  async function setState() {
    const allTags = await useApi.getTags()
    objMaterials.arrTags = JSON.parse(JSON.stringify(allTags))
    
    const allPosts = await useApi.getMaterials(paramsPageStore.objParamsPage)
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
        let filterActiveTags = paramsPageStore.objParamsPage.active_tags.filter(e => e !== tagId)

        paramsPageStore.changeActiveTags(filterActiveTags)
      } else {
        let expandOriginalActiveTags = paramsPageStore.objParamsPage.active_tags
        paramsPageStore.changeActiveTags([...expandOriginalActiveTags, tagId])
        objMaterials.arrTags[0].active = false
      }
      if (paramsPageStore.objParamsPage.active_tags.length == 0) {
        objMaterials.arrTags[0].active = true
        postsStore.changePostsList(objMaterials.arrPosts)
      } 

      const newMaterials = await useApi.getMaterials(paramsPageStore.objParamsPage)

      objMaterials.arrPosts = JSON.parse(JSON.stringify(newMaterials))
    }
  }

  async function handlerEnter(e) {
    if (e.code == 'Enter') {
      const newMaterials = await useApi.getMaterials(paramsPageStore.objParamsPage)

      objMaterials.arrPosts = JSON.parse(JSON.stringify(newMaterials))
    }
  }

  async function handlerActionFavorite() {
    paramsPageStore.changeToggleFavorite()
    await useApi.getMaterials(paramsPageStore.objParamsPage)
  }

  async function handlerActionUnfinished() {
    paramsPageStore.changeToggleUnfinished()
    await useApi.getMaterials(paramsPageStore.objParamsPage)
  }
</script>

<template>
  <div class="filter">
    <div class="filter-body">
      <div class="DF">
        <div class="filter_search DF AIC">
          <div class="filter_search-img">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 11.25L14.25 14.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 12.25C10.1234 12.25 12.25 10.1234 12.25 7.5C12.25 4.87665 10.1234 2.75 7.5 2.75C4.87665 2.75 2.75 4.87665 2.75 7.5C2.75 10.1234 4.87665 12.25 7.5 12.25Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <input class="filter_search-input" 
            type="text" 
            :onkeydown="handlerEnter"
            v-model="paramsPageStore.objParamsPage.search">
        </div>
        <div 
          v-if="windowSizeStore.objAdaptive.currentSize < 1200" 
          @click="objMaterials.showTagsAdaptive = !objMaterials.showTagsAdaptive"
          :class="{search_btn_active: objMaterials.showTagsAdaptive}"
          class="filter_search_btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.00008 3.33326C5.82327 3.33326 5.6537 3.4035 5.52868 3.52852C5.40365 3.65354 5.33341 3.82311 5.33341 3.99992C5.33341 4.17674 5.40365 4.3463 5.52868 4.47133C5.6537 4.59635 5.82327 4.66659 6.00008 4.66659C6.17689 4.66659 6.34646 4.59635 6.47149 4.47133C6.59651 4.3463 6.66675 4.17674 6.66675 3.99992C6.66675 3.82311 6.59651 3.65354 6.47149 3.52852C6.34646 3.4035 6.17689 3.33326 6.00008 3.33326ZM4.11341 3.33326C4.25115 2.9429 4.50657 2.60488 4.84448 2.36578C5.18239 2.12669 5.58614 1.99829 6.00008 1.99829C6.41402 1.99829 6.81777 2.12669 7.15568 2.36578C7.49359 2.60488 7.74901 2.9429 7.88675 3.33326H12.6667C12.8436 3.33326 13.0131 3.4035 13.1382 3.52852C13.2632 3.65354 13.3334 3.82311 13.3334 3.99992C13.3334 4.17674 13.2632 4.3463 13.1382 4.47133C13.0131 4.59635 12.8436 4.66659 12.6667 4.66659H7.88675C7.74901 5.05695 7.49359 5.39497 7.15568 5.63407C6.81777 5.87316 6.41402 6.00156 6.00008 6.00156C5.58614 6.00156 5.18239 5.87316 4.84448 5.63407C4.50657 5.39497 4.25115 5.05695 4.11341 4.66659H3.33341C3.1566 4.66659 2.98703 4.59635 2.86201 4.47133C2.73699 4.3463 2.66675 4.17674 2.66675 3.99992C2.66675 3.82311 2.73699 3.65354 2.86201 3.52852C2.98703 3.4035 3.1566 3.33326 3.33341 3.33326H4.11341ZM10.0001 7.33326C9.82327 7.33326 9.6537 7.4035 9.52868 7.52852C9.40365 7.65354 9.33342 7.82311 9.33342 7.99993C9.33342 8.17674 9.40365 8.3463 9.52868 8.47133C9.6537 8.59635 9.82327 8.66659 10.0001 8.66659C10.1769 8.66659 10.3465 8.59635 10.4715 8.47133C10.5965 8.3463 10.6667 8.17674 10.6667 7.99993C10.6667 7.82311 10.5965 7.65354 10.4715 7.52852C10.3465 7.4035 10.1769 7.33326 10.0001 7.33326ZM8.11341 7.33326C8.25115 6.9429 8.50657 6.60488 8.84448 6.36578C9.18239 6.12669 9.58614 5.99829 10.0001 5.99829C10.414 5.99829 10.8178 6.12669 11.1557 6.36578C11.4936 6.60488 11.749 6.9429 11.8867 7.33326H12.6667C12.8436 7.33326 13.0131 7.4035 13.1382 7.52852C13.2632 7.65354 13.3334 7.82311 13.3334 7.99993C13.3334 8.17674 13.2632 8.3463 13.1382 8.47133C13.0131 8.59635 12.8436 8.66659 12.6667 8.66659H11.8867C11.749 9.05695 11.4936 9.39497 11.1557 9.63407C10.8178 9.87316 10.414 10.0016 10.0001 10.0016C9.58614 10.0016 9.18239 9.87316 8.84448 9.63407C8.50657 9.39497 8.25115 9.05695 8.11341 8.66659H3.33341C3.1566 8.66659 2.98703 8.59635 2.86201 8.47133C2.73699 8.3463 2.66675 8.17674 2.66675 7.99993C2.66675 7.82311 2.73699 7.65354 2.86201 7.52852C2.98703 7.4035 3.1566 7.33326 3.33341 7.33326H8.11341ZM6.00008 11.3333C5.82327 11.3333 5.6537 11.4035 5.52868 11.5285C5.40365 11.6535 5.33341 11.8231 5.33341 11.9999C5.33341 12.1767 5.40365 12.3463 5.52868 12.4713C5.6537 12.5964 5.82327 12.6666 6.00008 12.6666C6.17689 12.6666 6.34646 12.5964 6.47149 12.4713C6.59651 12.3463 6.66675 12.1767 6.66675 11.9999C6.66675 11.8231 6.59651 11.6535 6.47149 11.5285C6.34646 11.4035 6.17689 11.3333 6.00008 11.3333ZM4.11341 11.3333C4.25115 10.9429 4.50657 10.6049 4.84448 10.3658C5.18239 10.1267 5.58614 9.99829 6.00008 9.99829C6.41402 9.99829 6.81777 10.1267 7.15568 10.3658C7.49359 10.6049 7.74901 10.9429 7.88675 11.3333H12.6667C12.8436 11.3333 13.0131 11.4035 13.1382 11.5285C13.2632 11.6535 13.3334 11.8231 13.3334 11.9999C13.3334 12.1767 13.2632 12.3463 13.1382 12.4713C13.0131 12.5964 12.8436 12.6666 12.6667 12.6666H7.88675C7.74901 13.0569 7.49359 13.395 7.15568 13.6341C6.81777 13.8732 6.41402 14.0016 6.00008 14.0016C5.58614 14.0016 5.18239 13.8732 4.84448 13.6341C4.50657 13.395 4.25115 13.0569 4.11341 12.6666H3.33341C3.1566 12.6666 2.98703 12.5964 2.86201 12.4713C2.73699 12.3463 2.66675 12.1767 2.66675 11.9999C2.66675 11.8231 2.73699 11.6535 2.86201 11.5285C2.98703 11.4035 3.1566 11.3333 3.33341 11.3333H4.11341Z" fill="#111111"></path></svg>
        </div>
      </div>
      <div v-if="objMaterials.showTagsAdaptive || windowSizeStore.objAdaptive.currentSize > 1200">
        <div class="tag" 
          v-for="(tag, index) in objMaterials.arrTags"
          :class="{active: tag.active, 'tag-for_junior': tag.tag === 'Для новеньких'}"
          :key="tag.id"
          @click="handlerTag(tag.id, index)">
          {{tag.tag}}
          <div class="tag_close_off" :class="{tag_close_on: tag.active}">
            <div class="tag_close-line line_first"></div>
            <div class="tag_close-line line_second"></div>
          </div>
        </div>
      </div>
      <div v-if="objMaterials.showTagsAdaptive || windowSizeStore.objAdaptive.currentSize > 1200" 
         class="filter_actions">
        <div class="DF AIC filter_actions-item">
          <div class="filter_actions-img">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.04485 4.02164C9.22991 3.84545 9.47619 3.74805 9.7317 3.74998C9.98722 3.75192 10.232 3.85304 10.4144 4.03201C10.5967 4.21098 10.7025 4.4538 10.7092 4.70923C10.716 4.96467 10.6232 5.21273 10.4506 5.40109L5.20867 11.9567C5.11854 12.0538 5.00975 12.1317 4.88881 12.1858C4.76788 12.2399 4.63728 12.269 4.50483 12.2715C4.37237 12.2739 4.24079 12.2497 4.11793 12.2001C3.99508 12.1505 3.88348 12.0767 3.78981 11.983L0.313605 8.50682C0.216798 8.41661 0.139152 8.30783 0.0852987 8.18697C0.0314452 8.0661 0.00248761 7.93563 0.000153343 7.80333C-0.00218092 7.67103 0.022156 7.53962 0.0717123 7.41693C0.121269 7.29424 0.195029 7.18279 0.288593 7.08922C0.382158 6.99566 0.493609 6.9219 0.616298 6.87234C0.738988 6.82278 0.870402 6.79845 1.0027 6.80078C1.135 6.80312 1.26547 6.83207 1.38634 6.88593C1.5072 6.93978 1.61598 7.01743 1.70619 7.11423L4.4572 9.86393L9.01857 4.05055C9.02675 4.0404 9.03553 4.03075 9.04485 4.02164V4.02164ZM7.83619 10.7744L9.04485 11.983C9.13849 12.0765 9.25001 12.1502 9.37274 12.1996C9.49547 12.249 9.6269 12.2733 9.7592 12.2708C9.89149 12.2684 10.0219 12.2393 10.1427 12.1853C10.2636 12.1314 10.3723 12.0536 10.4624 11.9567L15.7069 5.40109C15.8011 5.30808 15.8756 5.19703 15.926 5.07459C15.9763 4.95215 16.0015 4.82081 15.9999 4.68843C15.9984 4.55605 15.9702 4.42534 15.917 4.3041C15.8638 4.18286 15.7867 4.07359 15.6904 3.9828C15.594 3.89201 15.4804 3.82156 15.3562 3.77568C15.232 3.72979 15.0998 3.7094 14.9676 3.71572C14.8354 3.72205 14.7058 3.75496 14.5865 3.81248C14.4673 3.87001 14.3609 3.95098 14.2736 4.05055L9.71092 9.86393L9.07375 9.22544L7.83487 10.7744H7.83619Z" fill="white"></path></svg>
          </div>
          <p class="filter_actions-text">Показать незавершенные</p>
          <div class="filter_actions-toggle_check" 
            :class="{toggle_check_checked: paramsPageStore.objParamsPage.toggle_unfinished}"
            @click="handlerActionUnfinished">
            <div class="filter_actions-toggle_dot_check" 
              :class="{toggle_dot_check_checked: paramsPageStore.objParamsPage.toggle_unfinished}"></div>
          </div>
        </div>
        <div class="DF AIC filter_actions-item" >
          <div class="filter_actions-img">
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.26936 6.88896C1.07953 5.25931 1.47614 2.81483 3.4592 2C5.44226 1.18517 6.6321 2.81483 7.02871 3.62965C7.42533 2.81483 9.01178 1.18517 10.9948 2C12.9779 2.81483 12.9779 5.25931 11.7881 6.88896C10.5982 8.51862 7.02871 11.7779 7.02871 11.7779C7.02871 11.7779 3.4592 8.51862 2.26936 6.88896Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <p class="filter_actions-text">Показать избранное</p>
          <div class="filter_actions-toggle_favorite"
            :class="{toggle_favorite_checked: paramsPageStore.objParamsPage.toggle_favorite}"
            @click="handlerActionFavorite">
            <div class="filter_actions-toggle_dot_favorite" 
              :class="{toggle_dot_favorite_checked: paramsPageStore.objParamsPage.toggle_favorite}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>