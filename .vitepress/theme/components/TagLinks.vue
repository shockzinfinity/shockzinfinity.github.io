<template>
  <div v-if="tags && tags.length > 0" class="tags">
    Tags:&nbsp;
    <a v-for="tag in tags" :key="tag" :href="`/tags.html#${tag}`" class="tag">
      {{ tag }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

const { frontmatter } = useData();

const tags = computed(() => {
  return frontmatter.value.tags || [];
});
</script>

<style scoped>
.tags {
  margin-top: 10px;
}

.tag {
  padding: 5px 10px;
  border-radius: 7px;
  font-size: small;
  background: #3eaf7c;
  margin-right: 5px;
  color: white;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
  transition: background 0.2s;
}

.tag:hover {
  background: #2d9c65;
}
</style>
