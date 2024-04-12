// usePostDetails.ts
import {ref} from "vue";
import {IPost} from "@/types/post.types";
import {API_LINK, CACHE_MAX_AGE} from "@/globals.ts";
import {getSessionStorage, setSessionStorage} from "@/utils/storageUtils.ts";


export function usePostDetails() {
    const post = ref<IPost | null>(null);
    const isLoading = ref(false);
    const isError = ref(false);
    const errorMessage = ref<string | null>(null);

    const fetchPost = async (postId: number) => {
        isLoading.value = true;
        isError.value = false;
        errorMessage.value = null;

        const cacheKey = `post-${postId}`;

        const cachedPost = getSessionStorage<IPost>(cacheKey, CACHE_MAX_AGE);
        if (cachedPost) {
            post.value = cachedPost;
            isLoading.value = false;
            return;
        }

        try {
            const response = await fetch(`${API_LINK}/posts/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            const postData = await response.json();

            setSessionStorage(cacheKey, postData);

            post.value = postData;
        } catch (error) {
            isError.value = true;
            errorMessage.value = error.message;
        } finally {
            isLoading.value = false;
        }
    };

    return {post, fetchPost, isLoading, isError, error: errorMessage};
}
