<template>
  <input type="text" v-model="query" @input="handleInput" placeholder="Search..." class="search-input">
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { debounce } from '@/utils/debounce.ts';

const props = defineProps<{
  handleSearch: (query: string) => void;
}>()
const query = ref('');

const handleInput = debounce(() => {
  props.handleSearch(query.value.trim());
}, 300);
</script>

<style scoped>
.search-input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: #007bff;
}
</style>
