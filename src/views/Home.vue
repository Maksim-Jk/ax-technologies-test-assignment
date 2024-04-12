<template>
  <header>
    <h1>Posts</h1>
    <div class="controls">
      <div class="controls-filter">
        <SearchInput @input="handleSearch"/>
        <SortButton @title-sort="handleTitleSort"/>
      </div>
      <Pagination
          v-if="!isError && posts.length"
          :totalPages="totalPages"
          :currentPage="currentPage"
          @page-change="handlePageChange"
          @page-size-change="handleChangeItemsPerPage"
      />
    </div>
  </header>
  <main class="main">
    <PostList :posts="posts || []" :searchQuery="searchQuery" :isLoading="isLoading" :isError="isError" :error="error"/>
  </main>
</template>

<script setup lang="ts">
import {ref, onMounted, Ref, watch} from 'vue';
import {usePosts} from '@/services/postsApi.ts';
import PostList from '@/components/PostList.vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import Pagination from "@/components/Pagination.vue";
import SortButton from "@/components/SortButtons.vue";

const {posts, totalPages, fetchPosts, isLoading, isError, error} = usePosts();
const currentPage = ref(1);
const pageSize = ref(5);
const searchQuery = ref('');
const sortByTitleOrder: Ref<string | undefined> = ref(undefined);

onMounted(() => {
  fetchPosts(currentPage.value, pageSize.value);
});

watch([searchQuery, sortByTitleOrder, currentPage, pageSize],
    () => {
      fetchPosts(currentPage.value, pageSize.value, searchQuery.value.toLowerCase(), sortByTitleOrder.value)
    }, {immediate: true});

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1;
};

const handleTitleSort = (sortByTitleOrderValue: string | undefined) => {
  currentPage.value = 1;
  sortByTitleOrder.value = sortByTitleOrderValue;
}

const handleChangeItemsPerPage = (pageSizeNumber: number) => {
  currentPage.value = 1;
  pageSize.value = pageSizeNumber;
};
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
</style>
