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
        const posts = await axios({
            method: "get",
            url: "https://63385f16937ea77bfdbf1257.mockapi.io/kronaPostsList",
            data: objParam,
            headers: { "Content-Type": "" },
        })
        postsStore.changePostsList(posts.data)

        return posts.data
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
            headers: { "Content-Type": "" },
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
            headers: { "Content-Type": "" },
        })

        workStore.changeWorksList(works.data)

        return works.data
    }

    async function postWork(formData) {
        const answer = await axios({
            method: "post",
            url: "https://kronadev.ru/api_2/",
            data: formData,
            headers: { "Content-Type": "" },
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