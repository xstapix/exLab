import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from '@/pages/home/HomePage.vue'
import NotFound from '@/pages/404/NotFound.vue'
import Users from '@/pages/users/Users.vue'
import Post from '@/pages/post/Post.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: HomePage, alias: '/' },
        { path: '/users', component: Users },
        { path: '/post/:id', component: Post },
        { path: '/:not_page(.*)*', component: NotFound },
    ]
})