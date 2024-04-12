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
      <li v-if="!isError && posts.length === 0">No posts found</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import Loader from "@/components/ui/Loader.vue";
import PostListCard from "@/components/ui/PostListCard.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import {IPost} from "@/types/post.types";

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
