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

// что будет есди поставить регулярку не в конец 
// что такое pathMatch

// https://club.krona.studio/materials/ сделать вывод листа и фильтр для листа