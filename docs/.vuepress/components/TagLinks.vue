<template>
  <div>
    Tags:
    <router-link
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: `/tags.html#${tag}`}"
    >{{ tag }}&nbsp;</router-link>
  </div>
</template>