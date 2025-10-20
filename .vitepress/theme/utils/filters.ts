/**
 * 페이지 필터링 유틸리티
 * 
 * 사이드바, 최신글, 태그, 사이트맵 등에서 공통으로 사용하는 필터링 로직
 * 
 * 제외 규칙 (단 2가지):
 * 1. example/ - 예제 폴더
 * 2. excludes/ - 완전 비공개 폴더 (모든 곳에서 제외, Git에도 제외)
 */

/**
 * 페이지를 제외해야 하는지 판단
 * 
 * @param url - 페이지 URL
 * @param frontmatter - 페이지 frontmatter 데이터
 * @returns true면 제외해야 함
 */
export function shouldExcludePage(url: string, frontmatter?: any): boolean {
  const urlLower = url.toLowerCase();

  // 특수 페이지 제외
  if (
    urlLower.includes('/index') ||
    urlLower.includes('/404') ||
    urlLower.includes('/tags') ||
    urlLower.includes('/playground')
  ) {
    return true;
  }

  // 제외 폴더 (단 2가지)
  if (
    urlLower.includes('/example/') ||
    urlLower.includes('/excludes/')
  ) {
    return true;
  }

  return false;
}

/**
 * 최신 글 목록용 필터 (created 필드 체크 포함)
 * 
 * @param url - 페이지 URL
 * @param frontmatter - 페이지 frontmatter 데이터
 * @returns true면 포함해야 함
 */
export function shouldIncludeInRecentPosts(url: string, frontmatter?: any): boolean {
  // 기본 제외 조건 체크
  if (shouldExcludePage(url, frontmatter)) {
    return false;
  }

  // created 날짜가 있는 글만 포함
  if (!frontmatter?.created) {
    return false;
  }

  return true;
}

/**
 * 사이트맵용 필터
 * 
 * @param url - 페이지 URL
 * @returns true면 포함해야 함
 */
export function shouldIncludeInSitemap(url: string): boolean {
  const urlLower = url.toLowerCase();

  // excludes 폴더만 제외 (나머지는 검색엔진에 노출)
  return !urlLower.includes('excludes/');
}

