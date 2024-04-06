<template>
  <input type="text" v-model="query" @input="handleInput" placeholder="Search..." class="search-input">
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {debounce} from '@/utils/debounce.ts';

const props = defineProps<{
  handleSearch: (query: string) => void;
}>()
const query = ref('');

const handleInput = debounce(() => {
  props.handleSearch(query.value.trim());
}, 300);
</script>

<style scoped>

</style>
