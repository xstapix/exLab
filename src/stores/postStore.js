import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useStore = defineStore('postsStore', () => {
    const data = reactive({
        posts: [],
        tags: []
    })

    const changePostsList = (newList) => {
        data.posts = newList //добавить spread ...
    }

    const changeTagsList = (newList) => {
        data.tags = newList
    }

    return {
        data,
        changePostsList,
        changeTagsList
    }
})