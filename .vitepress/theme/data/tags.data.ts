import { createContentLoader } from 'vitepress';

export interface TagData {
  [tag: string]: {
    title: string;
    url: string;
  }[];
}

declare const data: TagData;
export { data };

export default createContentLoader('**/*.md', {
  transform(rawData): TagData {
    const tags: TagData = {};

    for (const page of rawData) {
      const pageTags = page.frontmatter?.tags;

      if (Array.isArray(pageTags)) {
        for (const tag of pageTags) {
          if (!tags[tag]) {
            tags[tag] = [];
          }

          tags[tag].push({
            title: page.frontmatter?.title || page.url,
            url: page.url
          });
        }
      }
    }

    // 각 태그의 페이지를 제목순으로 정렬
    for (const tag in tags) {
      tags[tag].sort((a, b) => a.title.localeCompare(b.title));
    }

    return tags;
  }
});

