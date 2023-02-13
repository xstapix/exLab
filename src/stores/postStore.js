import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useStore = defineStore('postsStore', () => {
    const data = reactive({
        posts: [],
        tags: []
    })

    const changePostsList = (newList) => {
        let xx = data.posts.concat(newList)

        data.posts = xx //добавить spread ...
        console.log(xx);
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