import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const getUserStore = defineStore('getUserStore', () => {
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