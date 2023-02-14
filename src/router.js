import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
    history: createWebHashHistory(),
    routes: [{
            path: '/',
            component: () =>
                import ('@/pages/home/HomePage.vue'),
            alias: '/'
        },
        {
            path: '/users',
            component: () =>
                import ('@/pages/users/Users.vue')
        },
        {
            path: '/payclub',
            component: () =>
                import ('@/pages/payClub/PayClub.vue')
        },
        {
            path: '/lk',
            component: () =>
                import ('@/pages/lk/PersonalArea.vue')
        },
        {
            path: '/login',
            component: () =>
                import ('@/pages/login/Login.vue')
        },
        {
            path: '/works',
            component: () =>
                import ('@/pages/works/Works.vue')
        },
        {
            path: '/user/:userId',
            component: () =>
                import ('@/pages/404/NotFound.vue')
        },
        {
            path: '/materials/:link',
            component: () =>
                import ('@/pages/post/Post.vue')
        },
        {
            path: '/:not_page(.*)*',
            component: () =>
                import ('@/pages/404/NotFound.vue')
        },
    ]
})