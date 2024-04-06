import {ref} from "vue";

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export function usePosts() {
    const posts = ref<IPost[]>([]);
    const totalPages = ref(0);
    const isLoading = ref(false);
    const isError = ref(false);
    const errorMessage = ref<string | null>(null);
    const cache: { [key: string]: IPost[] } = {};

    const fetchPosts = async (
        page: number,
        limit: number,
        query?: string,
        sortByTitleOrder?: string | undefined
    ) => {
        isLoading.value = true;
        isError.value = false;
        errorMessage.value = null;
        const cacheKey = `page=${page}&limit=${limit}&query=${query}&sortByTitle=${sortByTitleOrder}&sortOrder=${sortByTitleOrder}`;

        if (cache[cacheKey]) {
            posts.value = cache[cacheKey];
            isLoading.value = false;
            return;
        }

        let url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;

        if (query) {
            url += `&q=${query}`;
        }

        if (sortByTitleOrder) {
            url += `&_sort=title&_order=${sortByTitleOrder}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            const numberOfPostsHeader = response.headers.get('X-Total-Count');
            const numberOfPosts = numberOfPostsHeader ? parseInt(numberOfPostsHeader, 10) : undefined;
            if (numberOfPosts) {
                totalPages.value = Math.ceil(numberOfPosts / limit);
            }
            cache[cacheKey] = data;
            posts.value = data;

        } catch (error) {
            isError.value = true;
            errorMessage.value = error.message;
        } finally {
            isLoading.value = false;
        }
    };

    return {posts, totalPages, fetchPosts, isLoading, isError, error: errorMessage};
}

