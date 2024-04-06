<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id" class="post-item">
      <router-link :to="{ name: 'post-detail', params: { id: post.id }}" class="post-title">
        <span v-html="highlightSearch(post.title)"></span>
      </router-link>
      <p v-html="highlightSearch(post.body)"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Post } from "@/services/postsApi.ts";

const props = defineProps<{
  posts: Post[];
  searchQuery: string;
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

.post-item {
  margin-bottom: 10px;
}

.post-title {
  color: #007bff;
  text-decoration: none;
}

.post-title:hover {
  text-decoration: underline;
}

.post-title span mark {
  background-color: #00ff8c;
}

mark {
  background-color: #00ff8c;
}
</style>
