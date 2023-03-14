import axios from 'axios';
import { useStore } from '@/stores/postStore'
import { getUserStore } from '@/stores/userStore'
import { getWorkStore } from '@/stores/workStore'
import { getAuthStore } from '@/stores/AuthStore'

export const getApi = () => {
    const postsStore = useStore()
    const userStore = getUserStore()
    const useWorkStore = getWorkStore()
    const authStore = getAuthStore()

    const url = 'https://kronadev.ru/api_2/'

    async function getTags() {
        const tags = await axios.get('https://63385f16937ea77bfdbf1257.mockapi.io/kronaTags')
        postsStore.changeTagsList(tags.data)

        return tags.data
    }

    async function getMaterials(objParam) {
        objParam.method = 'getMaterialsPage'
        const posts = await axios.post(url, objParam)

        postsStore.changePostsList(posts.data.materials)
        postsStore.changeNext(posts.data.next)

        return posts.data.materials
    }

    async function getDetailMaterial(currentPostId) {
        const post = await axios.get(`https://63385f16937ea77bfdbf1257.mockapi.io/kronaPostsList/${1}`)

        return post.data
    }

    async function getUsers(objParam) {
        console.log(objParam);
        const users = await axios({
            method: "get",
            url: "https://6392fd90ab513e12c5ff47f0.mockapi.io/peopleVSU",
            data: objParam,
        })

        userStore.changeUsersList(users.data)

        return users.data
    }

    async function getDetailUser(userId) {
        const user = await axios({
            method: "get",
            url: "https://6392fd90ab513e12c5ff47f0.mockapi.io/peopleVSU/1",
            data: userId,
        })

        return user.data
    }

    async function getAuth(email, pass) {
        const auth = await axios({
            method: "get",
            url: 'https://63385f16937ea77bfdbf1257.mockapi.io/kronaPostsList/0',
            data: {
                email: email,
                password: pass
            }
        })

        return auth.data
    }

    async function getAuthFullData(userId) {
        const auth = await axios({
            method: "get",
            url: 'https://6392fd90ab513e12c5ff47f0.mockapi.io/peopleVSU/0',
            data: userId
        })

        authStore.data.user = auth.data
    }

    async function getWorks(objParam) {
        const works = await axios({
            method: "get",
            url: "https://6392fd90ab513e12c5ff47f0.mockapi.io/properties",
            data: objParam
        })

        useWorkStore.changeWorksList(works.data)

        return works.data
    }

    async function getDetailWork(idWork) {
        const work = await axios({
            method: "get",
            url: `https://6392fd90ab513e12c5ff47f0.mockapi.io/location/${idWork}`,
        })

        return work.data
    }

    async function sendWork(formData) {
        const answer = await axios.post(url, formData)

        return answer
    }

    return {
        getTags,
        getMaterials,
        getDetailMaterial,
        getUsers,
        getDetailUser,
        getAuth,
        getAuthFullData,
        getWorks,
        getDetailWork,
        sendWork,
    }
}