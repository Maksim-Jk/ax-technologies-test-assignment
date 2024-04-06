<template>
  <div>
    <button @click="toggleSortOrder" class="sort-button">
      Sort by Title
      <span v-if="sortByTitleOrder" class="sort-icon">{{ sortByTitleOrder === 'asc' ? '▲' : '▼' }}</span>
    </button>
    <button v-if="sortByTitleOrder" @click="resetSortOrder" class="cancel-button">X</button>
  </div>
</template>

<script setup lang="ts">
import {  ref } from 'vue';

const props = defineProps<{
  handleTitleSort: (order: string | undefined) => void;
}>()

const sortByTitleOrder = ref<string | undefined>(undefined);

const toggleSortOrder = () => {
  sortByTitleOrder.value = sortByTitleOrder.value === 'asc' ? 'desc' : 'asc';
  props.handleTitleSort(sortByTitleOrder.value);
};

const resetSortOrder = () => {
  sortByTitleOrder.value = undefined;
  props.handleTitleSort(sortByTitleOrder.value);
};
</script>

<style scoped>
.sort-button, .cancel-button {
  padding: 0.5rem 1rem;
  margin-right: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease;
}

.sort-button:hover, .cancel-button:hover {
  background-color: #0056b3;
}

.sort-icon {
  margin-left: 5px;
}

.cancel-button {
  background-color: #dc3545;
}

.cancel-button:hover {
  background-color: #bd2130;
}
</style>
