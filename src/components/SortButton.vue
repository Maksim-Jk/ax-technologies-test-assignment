<template>
  <div>
    <button @click="toggleSortOrder">
      Sort by Title
      <span v-if="sortByTitleOrder" class="sort-icon">{{ sortByTitleOrder === 'asc' ? '▲' : '▼' }}</span>
    </button>
    <button v-if="sortByTitleOrder" @click="resetSortOrder">Cancel Sorting</button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';

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
.sort-icon {
  margin-left: 5px;
}
</style>
