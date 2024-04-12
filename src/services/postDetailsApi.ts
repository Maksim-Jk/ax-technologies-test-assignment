import { ref} from "vue";
import {IPost} from "@/types/post.types";
import {API_LINK} from "@/globals.ts";

export function usePostDetails() {
    const post = ref<IPost | null>(null);
    const isLoading = ref(false);
    const isError = ref(false);
    const errorMessage = ref<string | null>(null);

    const fetchPost = async (postId: number) => {
        isLoading.value = true;

        try {
            const response = await fetch(`${API_LINK}/posts/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            post.value = await response.json();
        } catch (error) {
            isError.value = true;
                errorMessage.value = error.message;
        } finally {
            isLoading.value = false;
        }
    };

    return {post, fetchPost, isLoading, isError, error: errorMessage};
}
