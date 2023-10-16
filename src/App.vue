<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Canvas from "./components/Canvas.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <Canvas />
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
