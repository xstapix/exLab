import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from '@/pages/home/HomePage.vue'
import NotFound from '@/pages/404/NotFound.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: HomePage, alias: '/' },
        { path: '/:not_page(.*)*', component: NotFound },
    ]
})