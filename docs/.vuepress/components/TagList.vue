<template lang="pug">
  div
    span(v-for="tag in Object.keys(tags)")
      h2#tag
        router-link.header-anchor(
          :to="{ path: `/tags.html#${tag}` }"
          aria-hidden="true"
        ) #
        | {{ tag }}
      ul
        li(v-for="page in tags[tag]")
          router-link(:to="{ path: page.path }") {{ page.title }}
</template>

<script>
export default {
  computed: {
    tags() {
      let tags = {};
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          const tag = page.frontmatter.tags[index];
          if (tag in tags) {
            tags[tag].push(page);
          } else {
            tags[tag] = [page];
          }
        }
      }
      return tags;
    },
  },
};
</script>
