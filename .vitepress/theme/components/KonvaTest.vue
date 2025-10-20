<template>
  <ClientOnly>
    <v-stage class="test" :config="configKonva" ref="stage">
      <v-layer>
        <v-circle :config="configCircle" />
      </v-layer>
    </v-stage>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const stage = ref(null);

const configKonva = {
  width: 200,
  height: 200,
};

const configCircle = {
  x: 100,
  y: 100,
  radius: 70,
  fill: 'magenta',
  stroke: 'red',
  strokeWidth: 4,
};
</script>

<style scoped>
.test {
  margin: 0 auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}
</style>
