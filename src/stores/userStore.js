import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useUserStore = defineStore('userStore', () => {
    const data = reactive({
        users: []
    })

    const changeUsersList = (newList) => {
        data.users = newList
    }

    return {
        data,
        changeUsersList
    }
})