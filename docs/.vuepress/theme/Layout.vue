<template lang="pug">
ParentLayout
  Disqus.content(slot="page-bottom")
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
