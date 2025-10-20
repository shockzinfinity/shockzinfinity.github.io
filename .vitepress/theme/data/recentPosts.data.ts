import { createContentLoader } from 'vitepress';

export interface Post {
  title: string;
  url: string;
  created: string;
  updated: string;
  excerpt?: string;
  tags?: string[];
}

declare const data: Post[];
export { data };

export default createContentLoader('**/*.md', {
  excerpt: true,
  transform(rawData): Post[] {
    return rawData
      .filter(page => {
        // index, 404, tags, playground 등 특수 페이지 제외
        const url = page.url.toLowerCase();
        return !url.includes('/index') &&
          !url.includes('/404') &&
          !url.includes('/tags') &&
          !url.includes('/playground') &&
          !url.includes('/example/') &&
          page.frontmatter?.created && // created가 있는 글만
          !page.frontmatter?.draft && // draft가 아닌 것만
          !page.frontmatter?.exclude; // exclude가 아닌 것만
      })
      .map(page => {
        // HTML 태그 제거 함수
        const stripHtml = (html: string): string => {
          return html
            .replace(/<[^>]*>/g, '') // HTML 태그 제거
            .replace(/&nbsp;/g, ' ') // &nbsp; 공백으로
            .replace(/&amp;/g, '&')  // &amp; 변환
            .replace(/&lt;/g, '<')   // &lt; 변환
            .replace(/&gt;/g, '>')   // &gt; 변환
            .replace(/&quot;/g, '"') // &quot; 변환
            .replace(/\s+/g, ' ')    // 연속 공백 하나로
            .trim();
        };

        const excerpt = page.excerpt || page.frontmatter?.description || '';

        return {
          title: page.frontmatter?.title || page.url,
          url: page.url,
          created: page.frontmatter?.created || '',
          updated: page.frontmatter?.updated || page.frontmatter?.created || '',
          excerpt: stripHtml(excerpt),
          tags: page.frontmatter?.tags || []
        };
      })
      .sort((a, b) => {
        // created 날짜 내림차순 정렬 (최신순)
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      })
      .slice(0, 6); // 최신 6개만
  }
});

