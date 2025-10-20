<template>
  <div class="recent-posts-wrapper">
    <div v-if="!posts || posts.length === 0" class="no-posts">
      <p>데이터 로드 중... (posts: {{ posts ? posts.length : 'null' }})</p>
    </div>
    <div v-else class="recent-posts">
      <div class="container">
        <h2 class="section-title">📝 최신 글</h2>
        <div class="posts-grid">
          <article v-for="post in posts" :key="post.url" class="post-card">
            <a :href="post.url" class="post-link">
              <div class="post-header">
                <h3 class="post-title">{{ post.title }}</h3>
                <div class="post-dates">
                  <time class="post-date" :title="`생성: ${formatDate(post.created)}`">
                    {{ formatDate(post.created) }}
                  </time>
                  <span
                    v-if="post.updated !== post.created"
                    class="post-updated"
                    :title="`수정: ${formatDate(post.updated)}`"
                  >
                    ({{ formatDate(post.updated) }})
                  </span>
                </div>
              </div>
              <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p>
              <div v-if="post.tags && post.tags.length > 0" class="post-tags">
                <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>
            </a>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data as postsData } from '../data/recentPosts.data';

const posts = postsData;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
</script>

<style scoped>
.recent-posts-wrapper {
  width: 100%;
}

.no-posts {
  padding: 48px 24px;
  text-align: center;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}

.recent-posts {
  padding: 48px 24px;
  background: var(--vp-c-bg-soft);
}

.container {
  max-width: 1152px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin: 0 0 2rem 0;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.post-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.post-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.post-header {
  margin-bottom: 1rem;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-link:hover .post-title {
  color: var(--vp-c-brand-1);
}

.post-dates {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
}

.post-date {
  color: var(--vp-c-text-3);
}

.post-updated {
  color: var(--vp-c-brand-1);
  font-size: 0.8rem;
}

.post-excerpt {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* 반응형 */
@media (max-width: 768px) {
  .recent-posts {
    padding: 32px 16px;
  }

  .section-title {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .post-link {
    padding: 1.25rem;
  }

  .post-title {
    font-size: 1.1rem;
  }

  .post-excerpt {
    font-size: 0.9rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) {
  .posts-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
