<template>
  <div class="sort-button-container">
    <button @click="toggleSortOrder" class="sort-button">
      Sort by Title
      <span v-if="sortByTitleOrder" class="sort-icon" :class="sortByTitleOrder">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/>
        </svg>
      </span>
    </button>
    <button v-if="sortByTitleOrder" @click="resetSortOrder" class="cancel-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

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
.sort-button-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cancel-button {
  padding: var(--padding-small);
}

.sort-button-container svg {
  width: 12px;
  height: 12px;
}


.sort-icon.desc svg {
  transform: rotate(180deg);
}
</style>
