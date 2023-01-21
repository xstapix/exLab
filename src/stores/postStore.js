import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';

export const useStore = defineStore('postsStore', () => {
    const data = reactive({
        posts: [],
        tags: [],
        users: []
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
        changeTagsList,
        changeUsersList
    }
})