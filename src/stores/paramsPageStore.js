import { defineStore } from 'pinia'
import { reactive } from 'vue';
import { useStore } from '@/stores/postStore'

export const useParamsPageStore = defineStore('useParamsPageStore', () => {
    const postsStore = useStore()

    const objParamsPage = reactive({
        page: 1,
        activeTags: [],
        search: '',
        idLastMaterial: 0,
        toggleFavorite: false,
        toggleUnfinished: false
    })

    const changePage = () => {
        objParamsPage.page++
    }

    const changeActiveTags = (newTags) => {
        objParamsPage.activeTags = newTags
    }

    const changeSearch = (newSearch) => {
        objParamsPage.search = newSearch
    }

    const changeLastId = () => {
        objParamsPage.idLastMaterial = postsStore.data.posts[postsStore.data.posts.length - 1].id
    }

    const changeToggleFavorite = () => {
        objParamsPage.toggleFavorite = !objParamsPage.toggleFavorite
    }

    const changeToggleUnfinished = () => {
        objParamsPage.toggleUnfinished = !objParamsPage.toggleUnfinished
    }

    return {
        objParamsPage,
        changePage,
        changeActiveTags,
        changeSearch,
        changeLastId,
        changeToggleFavorite,
        changeToggleUnfinished
    }
})