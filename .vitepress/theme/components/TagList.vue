<template>
  <div v-if="tags && Object.keys(tags).length > 0">
    <div v-for="tag in sortedTags" :key="tag" class="tag-section">
      <h2 :id="tag" class="tag-heading">
        <a :href="`/tags.html#${tag}`" class="header-anchor" aria-hidden="true">#</a>
        {{ tag }}
      </h2>
      <ul class="tag-list">
        <li v-for="page in tags[tag]" :key="page.url">
          <a :href="page.url">{{ page.title }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="no-tags">
    <p>태그가 있는 페이지가 없습니다.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { data as tagsData } from '../data/tags.data';

const tags = computed(() => tagsData);

const sortedTags = computed(() => {
  return Object.keys(tags.value).sort();
});
</script>

<style scoped>
.tag-section {
  margin-bottom: 2rem;
}

.tag-heading {
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
  margin-top: 2rem;
}

.header-anchor {
  float: left;
  margin-left: -0.87em;
  padding-right: 0.23em;
  font-weight: 500;
  opacity: 0;
  text-decoration: none;
  transition: opacity 0.2s;
}

.tag-heading:hover .header-anchor {
  opacity: 1;
}

.tag-list {
  list-style: none;
  padding-left: 0;
}

.tag-list li {
  padding: 0.25rem 0;
}

.tag-list a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s;
}

.tag-list a:hover {
  color: var(--vp-c-brand-2);
}

.no-tags {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>
