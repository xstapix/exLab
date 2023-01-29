import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useStore = defineStore('postsStore', () => {
    const data = reactive({
        posts: [],
        tags: []
    })

    const changePostsList = (newList) => {
        data.posts = newList
    }

    const changeTagsList = (newList) => {
        data.tags = newList
    }

    const changeUsersList = (newList) => {
        data.users = newList
    }

    return {
        data,
        changePostsList,
        changeTagsList
    }
})