<template>
  <div class="search-input-container">
    <input type="text" v-model="query" @input="handleInput" placeholder="Search..." class="search-input">
    <div v-if="query" @click="handleReset" class="reset-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {debounce} from '@/utils/debounce.ts';

const props = defineProps<{
  handleSearch: (query: string) => void;
}>()
const query = ref('');

const handleInput = debounce((event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  props.handleSearch(inputElement.value.trim());
}, 300);

const handleReset = () => {
  query.value = '';
  props.handleSearch('');
}
</script>

<style scoped>
.search-input-container {
  position: relative;
}

.reset-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 4px;
  cursor: pointer;
}

.reset-button svg {
  width: 16px;
  height: 16px;
}
</style>
