<template>
  <div class="post-list">
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="isError" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="post in posts" :key="post.id" class="post-item">
        <router-link :to="{ name: 'post-detail', params: { id: post.id }}" class="post-title">
          <span v-html="highlightSearch(post.title)" class="title"></span>
        </router-link>
        <p v-html="highlightSearch(post.body)" class="body"></p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { IPost } from "@/services/postsApi.ts";

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
  margin-bottom: 20px;
}

.loading,
.error {
  margin-bottom: 10px;
  color: #dc3545;
}

.post-item {
  margin-bottom: 20px;
}

.post-title {
  color: #007bff;
  text-decoration: none;
}

.post-title:hover {
  text-decoration: underline;
}

.title mark,
.body mark {
  background-color: #ffc107; /* цвет для подсветки поиска */
}

mark {
  background-color: #ffc107; /* цвет для подсветки поиска */
}
</style>
