<template>
  <div class="post-list">
    <Loader v-if="isLoading"/>
    <ErrorMessage v-else-if="isError" :error="error"/>
    <ul v-else class="post-list">
      <PostListCard
          v-for="post in posts"
          :key="post.id"
          :title="highlightSearch(post.title)"
          :body="highlightSearch(post.body)"
          :post-id="post.id"/>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import {IPost} from "@/services/postsApi.ts";
import Loader from "@/components/Loader.vue";
import PostListCard from "@/components/PostListCard.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

const props = defineProps<{
  posts: IPost[];
  searchQuery: string;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}>()

const highlightSearch = (text: string) => {
  if (!props.searchQuery) return text;
  return text.replace(new RegExp(props.searchQuery, 'gi'), match => `<mark>${match}</mark>`);
}
</script>

<style scoped>
.post-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

</style>
