import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useWorkStore = defineStore('worksStore', () => {
    const data = reactive({
        works: []
    })

    const changeWorksList = (newList) => {
        data.works = newList //добавить spread ...
    }

    return {
        data,
        changeWorksList
    }
})