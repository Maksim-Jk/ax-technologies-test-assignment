<template>
  <div v-if="error" class="error">Error: {{ props.error }}</div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps<{
  error: string | null
}>()
</script>

<style scoped>
.error {
  background-color: var(--error);
  width: 100%;
  text-align: center;
  padding: 10px;
  border-radius: var(--radius-small);
  color: var(--text-color-light);
}
</style>