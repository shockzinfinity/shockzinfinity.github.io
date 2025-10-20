<template>
  <p class="demo">
    {{ msg }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const msg = ref('Hello this is <demo-component>');
</script>

<style scoped>
.demo {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
