import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const getWorkStore = defineStore('getWorkStore', () => {
    const data = reactive({
        works: []
    })

    const changeWorksList = (newList) => {
        data.works = newList
    }

    return {
        data,
        changeWorksList
    }
})