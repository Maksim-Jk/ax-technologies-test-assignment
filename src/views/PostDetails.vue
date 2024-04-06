<template>
  <div>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="isError" class="error">{{ error }}</div>
    <div v-else-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
      <CommentList :postId="postId"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {usePostDetails} from "@/services/postDetailsApi.ts";
import {useRoute} from 'vue-router';
import CommentList from "@/components/CommentList.vue";

const route = useRoute();
const postId = ref(parseInt(route.params.id as string));

const {post, fetchPost, isLoading, isError, error} = usePostDetails();

onMounted(async () => {
  await fetchPost(postId.value);
});
</script>

<style scoped>
.loading,
.error {
  margin-bottom: 10px;
  color: #dc3545;
}

.search-input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.2s ease;
  margin-bottom: 10px;
}

.search-input:focus {
  border-color: #007bff;
}
</style>
