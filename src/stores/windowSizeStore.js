import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useWindowSizeStore = defineStore('windowSizeStore', () => {
    const objAdaptive = reactive({
        mobile: false,
        tablet: false,
        desktop: false
    })

    if (window.innerWidth > 1000) {
        objAdaptive.mobile = false
        objAdaptive.tablet = false
        objAdaptive.desktop = true
    } else if ((680 < window.innerWidth) && (window.innerWidth < 1000)) {
        objAdaptive.mobile = false
        objAdaptive.tablet = true
        objAdaptive.desktop = false
    } else {
        objAdaptive.mobile = true
        objAdaptive.tablet = false
        objAdaptive.desktop = false
    }

    onresize = (event) => {
        if (event.target.innerWidth > 1000) {
            objAdaptive.mobile = false
            objAdaptive.tablet = false
            objAdaptive.desktop = true
        } else if ((680 < event.target.innerWidth) && (event.target.innerWidth < 1000)) {
            objAdaptive.mobile = false
            objAdaptive.tablet = true
            objAdaptive.desktop = false
        } else {
            objAdaptive.mobile = true
            objAdaptive.tablet = false
            objAdaptive.desktop = false
        }
    };

    return {
        objAdaptive,
    }
})