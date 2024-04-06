import {ref} from "vue";

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export function usePostDetails() {
    const post = ref<IPost | null>(null);
    const isLoading = ref(false);
    const isError = ref(false);
    const errorMessage = ref<string | null>(null);

    const fetchPost = async (postId: number) => {
        isLoading.value = true;

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            post.value = await response.json();
        } catch (error) {
            console.error('Error fetching post:', error);
            isError.value = true;
            errorMessage.value = error.message;
        } finally {
            isLoading.value = false;
        }
    };

    return {post, fetchPost, isLoading, isError, error: errorMessage};
}
