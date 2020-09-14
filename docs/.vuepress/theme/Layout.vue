<template lang="pug">
ParentLayout
  Disqus.content(slot='page-bottom', v-if='this.$frontmatter.disqus')
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue';
import Disqus from '../components/Disqus';

export default {
  components: {
    ParentLayout,
    Disqus,
  },
};
</script>

<style scoped>
.content {
  padding: 0 10%;
}
</style>
