<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Canvas from './components/Canvas.vue'
</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <Canvas />
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped></style>
