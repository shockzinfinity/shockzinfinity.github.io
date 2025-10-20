<template>
  <div id="disqus_thread"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useData } from 'vitepress';

const { frontmatter } = useData();

onMounted(() => {
  // frontmatter에 disqus: false가 명시되지 않은 경우에만 로드
  if (frontmatter.value.disqus !== false && !/localhost/.test(window.location.origin)) {
    const disqus_config = function () {
      this.page.url = window.location.origin;
      this.page.identifier = window.location.pathname;
    };

    const d = window.document;
    const s = d.createElement('script');
    s.src = 'https://shockz.disqus.com/embed.js';
    s.setAttribute('data-timestamp', String(+new Date()));
    (d.head || d.body).appendChild(s);
  }
});
</script>

<style scoped>
#disqus_thread {
  padding: 2rem 0;
}
</style>
