<template>
  <li class="post-item">
    <router-link :to="{ name: 'post-detail', params: { id: props.postId }}" class="post-link">
      <h3 v-html="props.title" class="post-title"></h3>
      <p v-html="props.body" class="post-body"></p>
    </router-link>
  </li>
</template>
<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps<{
  postId: number
  title: string
  body: string
}>()
</script>

<style scoped>
.post-item {
  width: 100%;
  background-color: var(--background-card);
  border-radius: var(--radius-medium);
  box-shadow: var(--shadow-medium);
  transition: box-shadow 0.3s ease;
}

.post-link:focus {
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-medium);
}

.post-item:hover {
  box-shadow: var(--shadow-medium-hover);
}

.post-link {
  display: block;
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>