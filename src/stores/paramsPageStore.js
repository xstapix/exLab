import { defineStore } from 'pinia'
import { reactive } from 'vue';

import { useStore } from '@/stores/postStore'

export const getParamsPageStore = defineStore('getParamsPageStore', () => {
    const postsStore = useStore()

    const objParamsPage = reactive({
        page: 1,
        active_tags: [],
        search: '',
        id_last_material: 0,
        toggle_favorite: false,
        toggle_unfinished: false
    })

    const changePage = () => {
        objParamsPage.page++
    }

    const changeActiveTags = (newTags) => {
        objParamsPage.active_tags = newTags
    }

    const changeSearch = (newSearch) => {
        objParamsPage.search = newSearch
    }

    const changeLastId = () => {
        objParamsPage.id_last_material = postsStore.data.posts[postsStore.data.posts.length - 1].id
    }

    const changeToggleFavorite = () => {
        objParamsPage.toggle_favorite = !objParamsPage.toggle_favorite
    }

    const changeToggleUnfinished = () => {
        objParamsPage.toggle_unfinished = !objParamsPage.toggle_unfinished
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