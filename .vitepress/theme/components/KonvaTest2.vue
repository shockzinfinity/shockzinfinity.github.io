<template>
  <ClientOnly>
    <div class="konva-container">
      <v-stage ref="stage" :config="stageConfig">
        <v-layer ref="layer">
          <v-group ref="group">
            <v-star
              v-for="item in list"
              :key="item.id"
              :config="{
                x: item.x,
                y: item.y,
                rotation: item.rotation,
                id: item.id,
                numPoints: 5,
                innerRadius: 30,
                outerRadius: 50,
                fill: '#89b717',
                opacity: 0.8,
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOpacity: 0.8,
                scaleX: item.scale,
                scaleY: item.scale,
              }"
            />
          </v-group>
        </v-layer>
      </v-stage>
      <div class="cache"><input type="checkbox" @change="handleCacheChange" /> cache shapes</div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const width = 600;
const height = 900;

const stage = ref(null);
const layer = ref(null);
const group = ref(null);
const list = ref<
  Array<{
    id: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
  }>
>([]);

const stageConfig = {
  width: width,
  height: height,
  draggable: true,
};

const handleCacheChange = (e: Event) => {
  const shouldCache = (e.target as HTMLInputElement).checked;
  if (group.value) {
    if (shouldCache) {
      (group.value as any).getNode().cache();
    } else {
      (group.value as any).getNode().clearCache();
    }
  }
};

onMounted(() => {
  for (let n = 0; n < 300; n++) {
    list.value.push({
      id: Math.round(Math.random() * 10000).toString(),
      x: Math.random() * width,
      y: Math.random() * height,
      rotation: Math.random() * 180,
      scale: Math.random(),
    });
  }
});
</script>

<style scoped>
.konva-container {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.cache {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cache input {
  margin-right: 5px;
}
</style>
