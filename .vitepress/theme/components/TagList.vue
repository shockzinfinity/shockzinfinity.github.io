<template>
  <div v-if="tags && Object.keys(tags).length > 0" class="tag-list-container">
    <!-- 통계 정보 -->
    <div class="tag-stats">
      <div class="stat-item">
        <span class="stat-icon">🏷️</span>
        <span class="stat-value">{{ Object.keys(tags).length }}</span>
        <span class="stat-label">개의 태그</span>
      </div>
      <div class="stat-item">
        <span class="stat-icon">📝</span>
        <span class="stat-value">{{ totalPosts }}</span>
        <span class="stat-label">개의 글</span>
      </div>
    </div>

    <!-- 태그 카드 그리드 -->
    <div class="tag-grid">
      <div v-for="tag in sortedTags" :key="tag" class="tag-card">
        <div class="tag-card-header" @click="toggleTag(tag)">
          <h3 :id="tag" class="tag-name">
            <a :href="`#${tag}`" class="header-anchor" aria-hidden="true" @click.stop>#</a>
            <span class="tag-badge">{{ tag }}</span>
            <span class="tag-count">{{ tags[tag].length }}</span>
            <span class="toggle-icon">{{ isExpanded(tag) ? '▼' : '▶' }}</span>
          </h3>
        </div>
        <div v-if="isExpanded(tag)" class="tag-card-body">
          <ul class="post-list">
            <li v-for="page in tags[tag]" :key="page.url" class="post-item">
              <a :href="page.url" class="post-link">
                <span class="post-icon">📄</span>
                <span class="post-title">{{ page.title }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="no-tags">
    <div class="no-tags-icon">🔍</div>
    <p class="no-tags-text">태그가 있는 페이지가 없습니다.</p>
    <p class="no-tags-hint">글을 작성할 때 frontmatter에 tags를 추가해보세요!</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { data as tagsData } from '../data/tags.data';

const tags = computed(() => tagsData);

const sortedTags = computed(() => {
  return Object.keys(tags.value).sort();
});

const totalPosts = computed(() => {
  let total = 0;
  for (const tag in tags.value) {
    total += tags.value[tag].length;
  }
  return total;
});

// 각 태그의 접힘/펼침 상태 (기본값: 모두 접힌 상태)
const expandedTags = ref<Set<string>>(new Set());

const toggleTag = (tag: string) => {
  if (expandedTags.value.has(tag)) {
    expandedTags.value.delete(tag);
  } else {
    expandedTags.value.add(tag);
  }
};

const isExpanded = (tag: string) => {
  return expandedTags.value.has(tag);
};
</script>

<style scoped>
/* 컨테이너 */
.tag-list-container {
  width: 100%;
  margin: 0 auto;
}

/* 통계 정보 */
.tag-stats {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  flex: 1;
  min-width: 180px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

/* 태그 그리드 */
.tag-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-top: 1.5rem;
}

/* 태그 카드 */
.tag-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.tag-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.tag-card-header {
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg-soft) 100%);
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
  user-select: none;
  transition: background 0.2s ease;
}

.tag-card-header:hover {
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg) 100%);
}

.tag-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
}

.header-anchor {
  opacity: 0;
  text-decoration: none;
  color: var(--vp-c-brand-1);
  transition: opacity 0.2s;
  font-weight: 400;
}

.tag-name:hover .header-anchor {
  opacity: 1;
}

.tag-badge {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.tag-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.4rem;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 10px;
}

.toggle-icon {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  transition: transform 0.2s ease;
}

.tag-card-body {
  padding: 0.5rem;
  max-height: 280px;
  overflow-y: auto;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 280px;
  }
}

/* 스크롤바 스타일 */
.tag-card-body::-webkit-scrollbar {
  width: 6px;
}

.tag-card-body::-webkit-scrollbar-track {
  background: var(--vp-c-bg-soft);
}

.tag-card-body::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 3px;
}

.tag-card-body::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-brand-1);
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  margin: 0;
}

.post-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.post-link:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-brand-1);
  padding-left: 1rem;
}

.post-icon {
  font-size: 0.9rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.post-link:hover .post-icon {
  opacity: 1;
}

.post-title {
  flex: 1;
  font-size: 0.85rem;
  line-height: 1.4;
}

/* 태그 없음 상태 */
.no-tags {
  padding: 3rem 2rem;
  text-align: center;
}

.no-tags-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-tags-text {
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
}

.no-tags-hint {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* 반응형 */
@media (max-width: 768px) {
  .tag-stats {
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }

  .stat-item {
    min-width: 140px;
    padding: 0.6rem 1rem;
  }

  .stat-icon {
    font-size: 1.25rem;
  }

  .stat-value {
    font-size: 1.1rem;
  }

  .stat-label {
    font-size: 0.75rem;
  }

  .tag-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .tag-card-header {
    padding: 0.85rem 1rem;
  }

  .tag-name {
    font-size: 0.95rem;
  }

  .tag-count {
    min-width: 1.35rem;
    height: 1.35rem;
    font-size: 0.65rem;
  }

  .tag-card-body {
    max-height: 200px;
  }

  .post-link {
    padding: 0.35rem 0.65rem;
  }

  .post-title {
    font-size: 0.8rem;
  }

  .post-icon {
    font-size: 0.85rem;
  }

  .no-tags {
    padding: 2.5rem 1.5rem;
  }

  .no-tags-icon {
    font-size: 2.5rem;
  }

  .no-tags-text {
    font-size: 1rem;
  }

  .no-tags-hint {
    font-size: 0.8rem;
  }
}
</style>
