import { defineStore } from 'pinia'

export const usePostStore = defineStore('titleStore', {
    state: () => ({
        posts: null,
        tags: []
    }),
    actions: {
        overwritePostsList(postslist) {
            console.log('postslist');
            console.log(postslist);
            this.posts = postslist
        },
    },
})