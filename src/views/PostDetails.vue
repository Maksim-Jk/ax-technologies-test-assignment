<template>
  <div class="post-details">
    <button @click="$router.go(-1)" class="back-button">Back</button>
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
import {ref, onMounted} from 'vue';
import {usePostDetails} from "@/services/postDetailsApi.ts";
import {useRoute} from 'vue-router';
import CommentList from "@/components/CommentList.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import Loader from "@/components/ui/Loader.vue";

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
  flex-direction: column;
}
.back-button{
  max-width: 62px;
  margin-bottom: 20px;
}

.post-body {
  margin-bottom: 20px;
}
</style>
