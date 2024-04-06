<template>
  <div>
    <div v-for="comment in comments" :key="comment.id">
      <div>
        <strong>{{ comment.name }}</strong>
        <p>{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Comment {
  postId: number;
  id: number;
  name: string;
  body: string;
}

const comments = ref<Comment[]>([]);

// Принимаем свойство comments из вне
const { props } = defineProps(['comments']);
</script>
