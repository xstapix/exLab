import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
    history: createWebHashHistory(),
    routes: [{
            path: '/',
            component: () =>
                import ('@/pages/materials/MaterialsPage.vue'),
            alias: '/'
        },
        {
            path: '/users',
            component: () =>
                import ('@/pages/users/Users.vue')
        },
        {
            path: '/users/:userId',
            component: () =>
                import ('@/pages/detailUserProfile/detailUserProfile.vue')
        },
        {
            path: '/users/:userId/works/:workId',
            component: () =>
                import ('@/pages/detailWork/DetailWork.vue')
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
            path: '/works/:workId',
            component: () =>
                import ('@/pages/detailWork/DetailWork.vue')
        },
        {
            path: '/materials/:link',
            component: () =>
                import ('@/pages/detailMaterial/DetailMaterial.vue')
        },
        {
            path: '/materials/:link/work/:workId',
            component: () =>
                import ('@/pages/detailWork/DetailWork.vue')
        },
        {
            path: '/:not_page(.*)*',
            component: () =>
                import ('@/pages/404/NotFound.vue')
        },
    ]
})