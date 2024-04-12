// usePosts.ts
import {ref} from "vue";
import {IPost} from "@/types/post.types";
import {API_LINK, CACHE_MAX_AGE} from "@/globals.ts";
import {getSessionStorage, setSessionStorage} from "@/utils/storageUtils.ts";

export function usePosts() {
    const posts = ref<IPost[]>([]);
    const totalPages = ref(0);
    const isLoading = ref(false);
    const isError = ref(false);
    const errorMessage = ref<string | null>(null);

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

        const cachedData = getSessionStorage<{ postsData: IPost[]; totalPagesData: number }>(
            cacheKey,
            CACHE_MAX_AGE
        );
        if (cachedData) {
            const {postsData, totalPagesData} = cachedData;
            posts.value = postsData;
            totalPages.value = totalPagesData;
            isLoading.value = false;
            return;
        }

        let url = `${API_LINK}/posts?_page=${page}&_limit=${limit}`;

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

            setSessionStorage(cacheKey, {postsData: data, totalPagesData: totalPages.value});

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
