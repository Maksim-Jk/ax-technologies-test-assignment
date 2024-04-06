<template>
  <header>
    <h1>Posts</h1>
    <div class="controls">
      <div class="controls-filter">
        <SearchInput :handleSearch="handleSearch"/>
        <SortButton :handleTitleSort="handleTitleSort"/>
      </div>
      <Pagination
          v-if="!isError && posts.length"
          :totalPages="totalPages"
          :currentPage="currentPage"
          :handlePageChange="handlePageChange"/>
    </div>
  </header>
  <main class="main">
    <PostList :posts="posts" :searchQuery="searchQuery" :isLoading="isLoading" :isError="isError" :error="error"/>
  </main>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {usePosts} from '@/services/postsApi.ts';
import PostList from '@/components/PostList.vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import Pagination from "@/components/Pagination.vue";
import SortButton from "@/components/SortButtons.vue";

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
.controls {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 20px;
}

.controls-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  width: 100%;
  max-width: 500px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
