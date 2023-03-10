import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const getAuthStore = defineStore('getAuthStore', () => {
    const data = reactive({
        auth: false,
        user: null
    })

    const changeAuth = (newAuth) => {
        data.auth = newAuth
    }

    const changeUser = (newUser) => {
        data.user = newUser
    }

    return {
        data,
        changeAuth,
        changeUser
    }
})