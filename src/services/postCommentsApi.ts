import {ref} from "vue";
import {API_LINK} from "@/globals.ts";

export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export function useComments() {
    const comments = ref<IComment[]>([]);
    const isLoading = ref(false);
    const isError = ref(false);
    const errorMessage = ref<string | null>(null);

    const fetchComments = async (postId: number, authorName?: string,) => {
        isLoading.value = true;
        isError.value = false;
        errorMessage.value = null;

        try {
            let url = `${API_LINK}/posts/${postId}/comments`;
            if (authorName) {
                url += `?name_like=${authorName}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }

            const data = await response.json();
            comments.value = data;

        } catch (error) {
            console.error('Error fetching comments:', error);
            isError.value = true;
            errorMessage.value = error.message;
        } finally {
            isLoading.value = false;
        }
    };

    return {comments, fetchComments, isLoading, isError, error: errorMessage};
}