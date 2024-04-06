<template>
  <div class="pagination">
    <Button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</Button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <Button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</Button>

    <!-- Добавленный выпадающий селект -->
    <select v-model="itemsPerPage" @change="handleSelectChange" class="pages-select">
      <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from 'vue';

const props = defineProps<{
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void
  handleChangeItemsPerPage: (pageSize: number) => void
}>()

const itemsPerPageOptions = [5, 10, 20];
const itemsPerPage = ref(itemsPerPageOptions[0]);

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    props.handlePageChange(page);
  }
}

const handleSelectChange = () => {
  props.handleChangeItemsPerPage(itemsPerPage.value);
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pages-select {
  padding: var(--padding-small) var(--padding-medium);
  border: 1px solid var(--border-color);
  background-color: var(--background-card);
  border-radius: var(--radius-small);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pages-select:hover {
  box-shadow: var(--shadow-small);
}

.pages-select:focus {
  outline: 1px solid var(--color-primary);
}

.pages-select:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
