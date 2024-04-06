<template>
  <input type="text" v-model="query" @input="handleInput" placeholder="Search...">
</template>

<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps<{
  handleSearch: (query: string) => void;
}>()

const query = ref('');

const handleInput = () => {
  props.handleSearch(query.value.trim());
}
</script>

<style>
</style>
