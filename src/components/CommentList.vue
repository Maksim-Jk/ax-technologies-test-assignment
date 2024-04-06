<template>
  <div class="comments-container">
    <h3>Comments</h3>
    <div class="comments-filter">
      Find comments by name
      <SearchInput :handleSearch="handleCommentSearch"/>
    </div>
    <div class="comments-body">
      <Loader v-if="isLoading"/>
      <ErrorMessage v-else-if="isError" :error="error"/>
      <ul v-else class="comments-list">
        <li v-for="comment in comments" :key="comment.id" class="comment-item">
          <h4 class="comment-title">{{ comment.name }}</h4>
          <p>{{ comment.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useComments} from "@/services/postCommentsApi.ts";
import SearchInput from "@/components/SearchInput.vue";
import Loader from "@/components/Loader.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

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

<style scoped>
.comments-container {
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
}

.comments-body {
  display: flex;
  justify-content: center;
}

.comments-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.comments-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.comment-item {
  padding: var(--padding-medium);
  background-color: var(--background-card-secondary);
  border-radius: var(--radius-medium);
  transition: box-shadow 0.3s ease;
  width: 100%;
}

.comment-title {
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
