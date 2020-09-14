<template lang="pug">
.tags Tags:
  router-link.tag(
    v-for="tag in $page.frontmatter.tags",
    :key="tag",
    :to="{ path: `/tags.html#${tag}` }"
  ) {{ tag }}
</template>

<style scoped>
.tags {
  margin-top: 10px;
}

.tag {
  padding: 5px;
  border-radius: 7px;
  font-size: small;
  background: #3eaf7c;
  margin-right: 5px;
  color: white;
  font-weight: 500;
}
</style>
