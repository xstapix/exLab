import axios from 'axios';
import { useStore } from '@/stores/postStore'
import { useUserStore } from '@/stores/userStore'
import { useWorkStore } from '@/stores/workStore'

export const getMethods = () => {
    const postsStore = useStore()
    const userStore = useUserStore()
    const workStore = useWorkStore()

    async function getTags() {
        const tags = await axios.get('https://63385f16937ea77bfdbf1257.mockapi.io/kronaTags')
        postsStore.changeTagsList(tags.data)

        return tags.data
    }

    async function getPosts(objParam) {
        objParam.method = 'getMaterialsPage'
        const posts = await axios.post("https://kronadev.ru/api_2/", objParam)
        console.log(posts);
        postsStore.changePostsList(posts.data.materials)


        return posts.data.materials
    }

    async function getPost(currentPostId) {
        const post = await axios.get(`https://63385f16937ea77bfdbf1257.mockapi.io/kronaPostsList/${currentPostId}`)

        return post.data
    }

    async function getUsers(objParam) {
        const users = await axios({
            method: "get",
            url: "https://6392fd90ab513e12c5ff47f0.mockapi.io/peopleVSU",
            data: objParam,
        })

        userStore.changeUsersList(users.data)

        return users.data
    }

    async function getAuth() {
        const auth = await axios.get('https://6392fd90ab513e12c5ff47f0.mockapi.io/peopleVSU/0')

        return auth.data
    }

    async function getWorks(objParam) {
        const works = await axios({
            method: "get",
            url: "https://6392fd90ab513e12c5ff47f0.mockapi.io/properties",
            data: objParam,
        })

        workStore.changeWorksList(works.data)

        return works.data
    }

    async function postWork(formData) {
        const answer = await axios.post("https://kronadev.ru/api_2/", {
            method: 'sendTest2'
        })

        return answer
    }

    return {
        getTags,
        getPosts,
        getPost,
        getUsers,
        getAuth,
        getWorks,
        postWork,
    }
}