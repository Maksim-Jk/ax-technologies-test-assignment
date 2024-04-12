<template>
  <div class="search-input-container">
    <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input">
    <div v-if="searchQuery" @click="handleReset" class="reset-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {debounce} from '@/utils/debounce.ts';

const query = ref('');

const emits = defineEmits(['input', 'reset']);

const handleInput = () => {
  emits('input', query.value.trim());
};

const handleReset = () => {
  query.value = '';
  emits('input', '');
}

const searchQuery = computed({
  get: () => query.value,
  set: debounce((value: string) => {
    query.value = value;
    handleInput();
  }, 300)
});
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
