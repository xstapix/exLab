import { getParamsPageStore } from '@/stores/paramsPageStore'

import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useStore = defineStore('postsStore', () => {
    const paramsPageStore = getParamsPageStore()

    const data = reactive({
        posts: [],
        tags: [],
        next: true
    })

    const changePostsList = (newList) => {
        if (paramsPageStore.objParamsPage.page === 1) {
            data.posts = newList
        } else {
            let totalList = data.posts.concat(newList)
            data.posts = totalList
        }

    }

    const changeTagsList = (newList) => {
        data.tags = newList
    }

    const changeNext = (boolean) => {
        data.next = boolean
    }

    return {
        data,
        changePostsList,
        changeTagsList,
        changeNext
    }
})