import axios from 'axios';
import { useStore } from '@/stores/postStore'
import { useUserStore } from '@/stores/userStore'

export const getMethods = () => {
    const postsStore = useStore()
    const userStore = useUserStore()

    async function getTags() {
        const tags = await axios.get('https://63385f16937ea77bfdbf1257.mockapi.io/kronaTags')
        postsStore.changeTagsList(tags.data)
        
        return tags.data
    }

    async function getPosts() {
        const posts = await axios.get('https://63385f16937ea77bfdbf1257.mockapi.io/kronaPostsList')
        postsStore.changePostsList(posts.data)

        return posts.data
    }
    
    async function getUsers() {
        const users = await axios.get('https://6392fd90ab513e12c5ff47f0.mockapi.io/peopleVSU')
        userStore.changeUsersList(users.data)

        return users.data
    }

    async function getAuth() {
        const auth = await axios.get('https://6392fd90ab513e12c5ff47f0.mockapi.io/location')

        return auth.data
    }

    return {
        getTags,
        getPosts,
        getUsers,
        getAuth
    }
}