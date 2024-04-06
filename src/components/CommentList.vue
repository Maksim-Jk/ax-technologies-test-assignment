<template>
  <div>
    <h3>Comments</h3>
    <SearchInput :handleSearch="handleCommentSearch"/>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="isError" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="comment in comments" :key="comment.id">
        <strong>{{ comment.name }}</strong> - {{ comment.body }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useComments} from "@/services/postCommentsApi.ts";
import SearchInput from "@/components/SearchInput.vue";

const {comments, fetchComments, isLoading, isError, error} = useComments();

const props = defineProps<{
  postId: number
}>()

onMounted(async () => {
  await fetchComments(props.postId);
});
const handleCommentSearch = (query: string) => {
  fetchComments(props.postId, query);
}
</script>
