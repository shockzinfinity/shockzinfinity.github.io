<template lang="pug">
#disqus_thread
</template>

<script>
export default {
  mounted() {
    if (!/localhost/.test(window.location.origin)) {
      let disqus_config = function() {
        this.open.url = window.location.origin;
        this.page.identifier = window.location.pathname;
      };
      (function() {
        let d = window.document,
          s = d.createElement('script');
        s.src = 'https://shockz.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
      })();
    }
  },
};
</script>
