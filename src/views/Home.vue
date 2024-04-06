<template>
  <div class="container">
    <h2>Posts</h2>
    <div class="controls">
      <SearchInput :handleSearch="handleSearch"/>
      <SortButton :handleTitleSort="handleTitleSort"/>
      <Pagination
          v-if="!isError"
          :totalPages="totalPages"
          :currentPage="currentPage"
          :handlePageChange="handlePageChange"/>
    </div>
    <PostList :posts="posts" :searchQuery="searchQuery" :isLoading="isLoading" :isError="isError" :error="error"/>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {usePosts} from '@/services/postsApi.ts';
import PostList from '@/components/PostList.vue';
import SearchInput from '@/components/SearchInput.vue';
import Pagination from "@/components/Pagination.vue";
import SortButton from "@/components/SortButton.vue";

const {posts, totalPages, fetchPosts, isLoading, isError, error} = usePosts();
const currentPage = ref(1);
const pageSize = 10;
const searchQuery = ref('');

onMounted(() => {
  fetchPosts(currentPage.value, pageSize);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchPosts(page, pageSize, searchQuery.value.toLowerCase());
};

const handleSearch = (query: string) => {
  fetchPosts(1, pageSize, query.toLowerCase());
  currentPage.value = 1;
  searchQuery.value = query;
};

const handleTitleSort = (sortByTitleOrder: string | undefined) => {
  fetchPosts(1, pageSize, searchQuery.value.toLowerCase(), sortByTitleOrder);
  currentPage.value = 1;
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.controls{
  display: flex;
  gap: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
