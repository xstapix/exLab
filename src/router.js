import { createRouter, createWebHashHistory } from "vue-router";

const HomePage = () =>
    import ('@/pages/home/HomePage.vue')
const Users = () =>
    import ('@/pages/users/Users.vue')
const NotFound = () =>
    import ('@/pages/404/NotFound.vue')
const Post = () =>
    import ('@/pages/post/Post.vue')
const Login = () =>
    import ('@/pages/login/Login.vue')
const Works = () =>
    import ('@/pages/works/Works.vue')
const PersonalArea = () =>
    import ('@/pages/lk/PersonalArea.vue')
const PayClub = () =>
    import ('@/pages/payClub/PayClub.vue')

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: HomePage, alias: '/' },
        { path: '/users', component: Users },
        { path: '/payclub', component: PayClub },
        { path: '/lk', component: PersonalArea },
        { path: '/login', component: Login },
        { path: '/works', component: Works },
        { path: '/user/:userId', component: NotFound },
        { path: '/post/:id', component: Post },
        { path: '/:not_page(.*)*', component: NotFound },
    ]
})