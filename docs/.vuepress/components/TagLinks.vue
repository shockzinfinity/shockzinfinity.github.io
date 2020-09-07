<template lang="pug">
  div Tags: 
    router-link(
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: `/tags.html#${tag}`}"
    ) {{ tag }} 
</template>
