# shockzinfinity.github.io

[![Deploy Status](https://github.com/shockzinfinity/shockzinfinity.github.io/workflows/VitePress%20%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC%20Pages%EC%97%90%20%EB%B0%B0%ED%8F%AC/badge.svg)](https://github.com/shockzinfinity/shockzinfinity.github.io/actions)
[![VitePress](https://img.shields.io/badge/VitePress-2.0.0--alpha.12-646cff.svg)](https://vitepress.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-10.13.1-F69220.svg)](https://pnpm.io/)
[![Node](https://img.shields.io/badge/node-22-339933.svg)](https://nodejs.org/)

> 개인 기술 블로그 - VitePress 기반 정적 사이트

## 🌐 사이트

**URL**: [https://shockzinfinity.github.io](https://shockzinfinity.github.io)

## 🚀 기술 스택

- **[VitePress](https://vitepress.dev/)** - Vue 기반 정적 사이트 생성기
- **[Vue 3](https://vuejs.org/)** - Composition API
- **[TypeScript](https://www.typescriptlang.org/)** - 타입 안정성
- **[pnpm](https://pnpm.io/)** - 빠른 패키지 매니저
- **GitHub Actions** - 자동 배포

## 📦 설치

### 사전 요구사항

- Node.js 18+ (권장: 22)
- pnpm 8+

### 설치 방법

```bash
# 저장소 클론
git clone https://github.com/shockzinfinity/shockzinfinity.github.io.git
cd shockzinfinity.github.io

# 의존성 설치
pnpm install
```

## 💻 개발

### 개발 서버 실행

```bash
pnpm run dev
```

브라우저에서 `http://localhost:5173` 열기

### 빌드

```bash
pnpm run build
```

빌드 결과물: `.vitepress/dist/`

### 빌드 미리보기

```bash
pnpm run preview
```

## 📁 프로젝트 구조

```
shockzinfinity.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 워크플로우
├── .vitepress/
│   ├── config.mts              # VitePress 설정
│   ├── theme/
│   │   ├── index.ts            # 커스텀 테마
│   │   ├── style.css           # 전역 스타일
│   │   ├── components/         # Vue 컴포넌트
│   │   │   ├── Disqus.vue
│   │   │   ├── TagList.vue
│   │   │   ├── TagLinks.vue
│   │   │   ├── KonvaTest.vue
│   │   │   └── ...
│   │   ├── data/
│   │   │   ├── tags.data.ts        # 태그 데이터 로더
│   │   │   └── recentPosts.data.ts # 최신 글 데이터 로더
│   │   └── utils/
│   │       └── filters.ts          # 공통 필터링 로직
│   └── cache/                      # 빌드 캐시
├── .husky/
│   └── pre-commit              # Git pre-commit hook
├── scripts/
│   ├── update-frontmatter-dates.js # Git 기반 날짜 초기화
│   └── update-modified-dates.js    # 커밋 시 날짜 갱신 (pre-commit)
├── src/
│   ├── index.md                # 홈페이지
│   ├── playground.md           # 컴포넌트 데모
│   ├── tags.md                 # 태그 목록 페이지
│   ├── 404.md                  # 커스텀 404 페이지
│   ├── public/                 # 정적 파일
│   │   ├── img/
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── example/                # 예제 (사이드바 제외, 검색엔진 노출)
│   ├── excludes/               # 비공개 (모든 곳에서 제외, Git 제외)
│   ├── dev-log/                # 개발 로그
│   ├── tutorials/              # 튜토리얼
│   └── etc/                    # 기타
├── package.json
├── pnpm-lock.yaml
├── MIGRATION.md                # 마이그레이션 가이드
└── README.md
```

## 🎨 컴포넌트

모든 컴포넌트는 마크다운에서 바로 사용 가능합니다.

### 사용 가능한 컴포넌트

- `<TagList />` - 모든 태그와 페이지 목록 (접기/펼치기 지원)
- `<TagLinks />` - 현재 페이지의 태그
- `<RecentPosts />` - 최신 글 6개 표시 (홈페이지용)
- `<DateDisplay />` - 글 작성/수정 날짜 표시 (자동 통합)
- `<KonvaTest />` - Canvas 그래픽 데모
- `<KonvaTest2 />` - 고급 Canvas 데모
- `<DemoComponent />` - 데모 컴포넌트

### 자동 통합 컴포넌트

다음 컴포넌트는 모든 페이지에 자동으로 추가됩니다:

- **`DateDisplay`** - 각 글 상단에 작성/수정 날짜 표시
- **`Disqus`** - 각 글 하단에 댓글 시스템

### 예시

```markdown
---
title: 내 포스트
tags: [vue, vitepress]
created: 2025-01-15
updated: 2025-01-20
---

# 내 포스트

<!-- DateDisplay 자동 표시 -->

<TagLinks />

## 내용...

<!-- Disqus 자동 표시 -->
```

자세한 사용법은 [Playground](/playground) 페이지 참고

## 🏷️ Frontmatter

각 마크다운 파일에서 사용할 수 있는 메타데이터:

```yaml
---
title: 페이지 제목
description: 페이지 설명
tags: [tag1, tag2, tag3]
created: 2025-01-15 # 작성 날짜 (Git 기록에서 자동 생성)
updated: 2025-01-20 # 수정 날짜 (커밋 시 자동 갱신)
disqus: false # Disqus 댓글 비활성화
---
```

### 날짜 자동 관리

- **`created`**: Git 히스토리에서 파일의 최초 커밋 날짜 사용
- **`updated`**: 커밋 시마다 자동으로 오늘 날짜로 갱신 (pre-commit hook)
- **수동 관리 불필요**: 스크립트와 Git hook이 자동으로 처리

```bash
# 모든 파일의 날짜 초기화/업데이트
pnpm run update-dates
```

## 🚀 배포

### 자동 배포 (GitHub Actions)

`main` 브랜치에 푸시하면 자동으로 배포됩니다:

```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Actions가 자동으로:

1. 의존성 설치
2. VitePress 빌드
3. GitHub Pages 배포

### 배포 상태 확인

[Actions 탭](https://github.com/shockzinfinity/shockzinfinity.github.io/actions)에서 배포 진행 상황 확인

## 🔧 설정

### VitePress 설정

`.vitepress/config.mts` 파일에서 사이트 설정:

```typescript
export default defineConfig({
  title: 'shockz Blog',
  description: 'shockz Blog with vitePress',
  srcDir: 'src',
  // ... 기타 설정
});
```

### 테마 커스터마이징

`.vitepress/theme/index.ts`에서 테마 확장:

```typescript
import DefaultTheme from 'vitepress/theme';
import MyComponent from './components/MyComponent.vue';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('MyComponent', MyComponent);
  },
};
```

## 🔒 Repository 공개 설정

### 민감한 정보 관리

Public repository에서도 비공개 콘텐츠를 안전하게 관리할 수 있습니다:

#### 1. `excludes/` 폴더 사용 (권장)

완전 비공개 문서는 `src/excludes/` 폴더에 저장:

```bash
# 비공개 메모 작성
echo "# 개인 메모" > src/excludes/note.md
```

**특징:**

- ✅ 사이드바 제외
- ✅ 최신글 제외
- ✅ 태그 제외
- ✅ 사이트맵 제외 (검색엔진 차단)
- ✅ **Git 제외** (저장소에 커밋 안 됨)

#### 2. `example/` 폴더 사용

공개 예제/튜토리얼은 `src/example/` 폴더에 저장:

```bash
# 예제 문서 작성
echo "# 데모" > src/example/demo.md
```

**특징:**

- ✅ 사이드바 제외 (네비게이션 깔끔)
- ✅ 최신글 제외
- ✅ 태그 제외
- ✅ **사이트맵 포함** (검색엔진 노출)
- ✅ **Git 포함** (저장소에 커밋됨)

#### 3. 환경 변수로 민감한 데이터 관리

```typescript
// config.mts에서
const API_KEY = process.env.VITE_API_KEY;
```

GitHub Secrets에 저장:

```
Repository → Settings → Secrets and variables → Actions
→ New repository secret
```

## 📝 글 작성

### 새 글 작성

1. `src/` 디렉토리 내 적절한 폴더에 `.md` 파일 생성
2. Frontmatter 추가
3. 마크다운으로 작성
4. 커밋 & 푸시

### 예시

```markdown
---
title: VitePress 시작하기
description: VitePress로 블로그 만들기
tags: [vitepress, vue, blog]
---

# VitePress 시작하기

VitePress는 Vue 기반의 정적 사이트 생성기입니다...
```

## 📑 콘텐츠 분류 전략

프로젝트는 **2가지 제외 규칙**으로 콘텐츠를 관리합니다.

### 제외 규칙 (단 2가지)

| 폴더            | 용도        | 사이드바 | 최신글 | 태그 | 사이트맵 | Git     |
| --------------- | ----------- | -------- | ------ | ---- | -------- | ------- |
| **`example/`**  | 공개 예제   | ❌       | ❌     | ❌   | ✅ 포함  | ✅ 커밋 |
| **`excludes/`** | 완전 비공개 | ❌       | ❌     | ❌   | ❌       | ❌ 제외 |

### `example/` - 공개 예제

**용도:**

- VitePress 기본 예제 파일
- 공개 튜토리얼
- 데모 문서

**특징:**

- 사이드바를 깔끔하게 유지
- 검색엔진 노출 가능 (SEO)
- Git 저장소에 포함

**예시:**

```bash
src/example/
├── markdown-examples.md
├── api-examples.md
└── demo.md
```

### `excludes/` - 완전 비공개

**용도:**

- 개인 메모
- 작성 중인 초안
- 절대 공개하면 안 되는 문서

**특징:**

- 어디에도 노출 안 됨
- 검색엔진 차단
- **Git 저장소에서 제외** (`.gitignore`)

**예시:**

```bash
src/excludes/
├── personal-note.md
├── draft-post.md
└── private-memo.md
```

### 구현 (`.vitepress/config.mts`)

```typescript
const vitePressSidebarOptions = {
  excludePattern: [
    'example/**', // 예제 폴더
    'excludes/**', // 비공개 폴더
    'public/**', // 정적 파일
    '404.md', // 특수 페이지
    'tags.md',
    'playground.md',
  ],
};
```

### 특수 페이지

다음 페이지들은 네비게이션/자동으로 접근:

- **`tags.md`** - 네비게이션 링크 (`/tags`)
- **`playground.md`** - 네비게이션 링크 (`/playground`)
- **`404.md`** - 404 오류 시 자동 표시
- **`index.md`** - 홈페이지

## 🔍 검색

로컬 검색 기능이 내장되어 있습니다. 사이트 상단의 검색 바를 사용하세요.

## 💬 댓글

Disqus를 사용한 댓글 시스템이 각 페이지 하단에 자동으로 추가됩니다.

- localhost에서는 표시되지 않음
- 비활성화: frontmatter에 `disqus: false` 추가

## 🛠️ 문제 해결

### 포트 충돌

```bash
# 다른 포트로 실행
pnpm run dev -- --port 3000
```

### 캐시 정리

```bash
# node_modules 및 캐시 삭제
rm -rf node_modules .vitepress/cache
pnpm install
```

### 빌드 오류

```bash
# 의존성 재설치
pnpm install --frozen-lockfile
pnpm run build
```

## 📚 참고 자료

- [VitePress 공식 문서](https://vitepress.dev/)
- [Vue 3 문서](https://vuejs.org/)
- [VitePress 테마 가이드](https://vitepress.dev/guide/custom-theme)
- [마크다운 확장](https://vitepress.dev/guide/markdown)

## 📜 라이선스

MIT License

## 👤 작성자

**Jun Yu (shockz)**

- GitHub: [@shockzinfinity](https://github.com/shockzinfinity)
- Email: shockzinfinity@gmail.com
