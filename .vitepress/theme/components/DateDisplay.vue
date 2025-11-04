<template>
  <div v-if="created || updated" class="date-display">
    <div class="date-info">
      <span v-if="created" class="date-item">
        <span class="date-icon">📅</span>
        <span class="date-label">작성:</span>
        <time class="date-value" :datetime="created">{{ formatDate(created) }}</time>
      </span>
      <span v-if="updated && updated !== created" class="date-item updated">
        <span class="date-icon">🔄</span>
        <span class="date-label">수정:</span>
        <time class="date-value" :datetime="updated">{{ formatDate(updated) }}</time>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';

const { frontmatter } = useData();

const created = computed(() => frontmatter.value.created);
const updated = computed(() => frontmatter.value.updated);

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
</script>

<style scoped>
.date-display {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 6px;
}

.date-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
}

.date-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.date-icon {
  font-size: 1rem;
}

.date-label {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.date-value {
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.date-item.updated .date-value {
  color: var(--vp-c-brand-1);
}

/* 반응형 */
@media (max-width: 640px) {
  .date-display {
    padding: 0.875rem 1rem;
    margin: 1.25rem 0;
  }

  .date-info {
    gap: 1rem;
  }

  .date-item {
    font-size: 0.85rem;
  }

  .date-icon {
    font-size: 0.9rem;
  }
}
</style>
