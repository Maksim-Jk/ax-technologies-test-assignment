<template>
  <div class="pagination">
    <button class="pagination-button" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
    <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
    <button class="pagination-button" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next
    </button>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';

const props = defineProps<{
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void
}>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    props.handlePageChange(page);
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
}

.pagination-info {
  margin: 0 1rem;
}
</style>
