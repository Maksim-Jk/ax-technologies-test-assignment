<template>
  <div class="post-details">
    <Loader v-if="isLoading"/>
    <ErrorMessage v-else-if="isError" :error="error"/>
    <div v-else-if="post">
      <div class="post-body">
        <h1>{{ post.title }}</h1>
        <p>{{ post.body }}</p>
      </div>
      <CommentList :postId="postId"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {usePostDetails} from "@/services/postDetailsApi.ts";
import {useRoute} from 'vue-router';
import CommentList from "@/components/CommentList.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Loader from "@/components/Loader.vue";

const route = useRoute();
const postId = ref(parseInt(route.params.id as string));

const {post, fetchPost, isLoading, isError, error} = usePostDetails();

onMounted(async () => {
  await fetchPost(postId.value);
});
</script>

<style scoped>
.post-details {
  width: 100%;
  background-color: var(--background-card);
  border-radius: var(--radius-medium);
  box-shadow: var(--shadow-medium);
  transition: box-shadow 0.3s ease;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.post-body {
  margin-bottom: 20px;
}
</style>
