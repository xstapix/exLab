import { defineStore } from 'pinia'

export const usePostStore = defineStore('titleStore', {
    state: () => ({
        posts: null,
        tags: null
    })
})