<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <div>
    <RouterLink to="/post/1">Post</RouterLink>
    <RouterView/>
  </div>
</template>

<style \>
@import "@/styles/reset.css";

</style>
