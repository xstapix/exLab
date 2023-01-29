import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
    const data = reactive({
        auth: false
    })

    const changeAuth = (newAuth) => {
        data.auth = newAuth
    }

    return {
        data,
        changeAuth
    }
})