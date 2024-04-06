<template>
  <div class="pagination">
    <Button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</Button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <Button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
      Next
    </Button>
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
  gap: 12px;
}

.pagination-info {
  margin: 0 16px;
}
</style>
