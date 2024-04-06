import {ref} from "vue";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export function usePosts() {
    const posts = ref<Post[]>([]);
    const totalPages = ref(0);
    const cache: { [key: string]: Post[] } = {};

    const fetchPosts = async (
        page: number,
        limit: number,
        query?: string,
        sortByTitleOrder?: string | undefined
    ) => {
        const cacheKey = `page=${page}&limit=${limit}&query=${query}&sortByTitle=${sortByTitleOrder}&sortOrder=${sortByTitleOrder}`;

        if (cache[cacheKey]) {
            posts.value = cache[cacheKey];
            return;
        }

        let url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;

        if (query) {
            url += `&q=${query}`;
        }

        if (sortByTitleOrder) {
            url += `&_sort=title`;

            if (sortByTitleOrder) {
                url += `&_order=${sortByTitleOrder}`;
            }
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            const numberOfPostsHeader = response.headers.get('X-Total-Count');
            const numberOfPosts = numberOfPostsHeader ? parseInt(numberOfPostsHeader, 10) : undefined;
            if (numberOfPosts) {
                totalPages.value = Math.ceil(numberOfPosts / limit);
            }

            cache[cacheKey] = data;
            posts.value = data;
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return {posts, totalPages, fetchPosts};
}