<template>
  <div class="container">
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import {watch} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();

watch(
    () => route.meta.title,
    (newTitle) => {
      document.title = newTitle || 'Мое приложение'; // Устанавливаем заголовок страницы
    }
);
</script>

<style>
@import "@/styles/index.css";

</style>
