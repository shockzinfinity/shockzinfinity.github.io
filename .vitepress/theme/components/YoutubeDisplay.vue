<template>
  <div class="youtube-display">
    <div
      style="
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        max-width: 100%;
      "
    >
      <iframe
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
        :src="`https://www.youtube.com/embed/${shareId}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      >
      </iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  shareId: string;
}

const props = defineProps<Props>();
</script>
