import axios from 'axios';
import { useStore } from '@/stores/postStore'

export const getMethods = () => {
    const postsStore = useStore()

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

    return {
        getTags,
        getPosts
    }
}