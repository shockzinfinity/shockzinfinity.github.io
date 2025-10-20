# VuePress → VitePress 마이그레이션 가이드

## ✅ 완료된 마이그레이션 작업

### 1. GitHub Actions 워크플로우 업데이트

#### 이전 (VuePress - `main.yml`)

```yaml
name: build & deploy
on:
  push:
    branches: [master]

jobs:
  build-and-deploy:
    steps:
      - uses: jenkey2011/vuepress-deploy@master
        env:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          TARGET_REPO: shockzinfinity/shockzinfinity.github.io
          TARGET_BRANCH: gh-pages
          BUILD_SCRIPT: yarn cache clean && yarn && yarn build
          BUILD_DIR: docs/.vuepress/dist
```

#### 이후 (VitePress - `deploy.yml`)

```yaml
name: VitePress 사이트를 Pages에 배포
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        # package.json의 packageManager 필드에서 버전 자동 감지

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build with VitePress
        run: pnpm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### 2. 주요 변경 사항

| 항목                | VuePress              | VitePress                   |
| ------------------- | --------------------- | --------------------------- |
| **트리거 브랜치**   | `master`              | `main`                      |
| **빌드 디렉토리**   | `docs/.vuepress/dist` | `.vitepress/dist`           |
| **배포 방식**       | gh-pages 브랜치       | GitHub Pages Artifact       |
| **패키지 매니저**   | yarn                  | pnpm                        |
| **Node 버전**       | -                     | 22                          |
| **액세스 토큰**     | `ACCESS_TOKEN` 필요   | 불필요 (자동)               |
| **워크플로우 권한** | repo 전체             | pages, contents, id-token만 |

### 3. 보안 개선

#### 이전:

- Personal Access Token (PAT) 필요
- repo 전체 권한 필요
- 시크릿 관리 필요

#### 이후:

- `GITHUB_TOKEN` 자동 사용 (시크릿 불필요)
- 최소 권한 원칙 (pages, contents, id-token만)
- 더 안전한 배포 프로세스

### 4. 성능 개선

#### pnpm 사용:

- 디스크 공간 절약
- 더 빠른 설치 속도
- 엄격한 의존성 관리

#### 빌드 최적화:

- `--frozen-lockfile`: 정확한 버전 보장
- Node 캐시 활성화
- Artifact 기반 배포

## 🔧 GitHub Pages 설정 확인

### 1. Settings → Pages 설정

레포지토리 설정에서:

1. **Settings** → **Pages** 이동
2. **Source**: "GitHub Actions" 선택
3. **Branch**: 설정 불필요 (Artifact 배포)

### 2. 브랜치 확인

현재 사용 중인 기본 브랜치 확인:

```bash
git branch --show-current
```

- `main` 브랜치 사용: 설정 완료 ✅
- `master` 브랜치 사용: `deploy.yml` 수정 필요

`deploy.yml` 6-8번째 줄 수정:

```yaml
on:
  push:
    branches: [master] # main → master로 변경
```

## 📝 프로젝트 구조 변경

### 이전 (VuePress):

```
shockzinfinity.github.io/
├── docs/
│   ├── .vuepress/
│   │   ├── config.js
│   │   ├── theme/
│   │   └── components/
│   └── *.md
└── package.json
```

### 이후 (VitePress):

```
shockzinfinity.github.io/
├── src/
│   ├── *.md
│   └── public/
├── .vitepress/
│   ├── config.mts
│   └── theme/
│       ├── index.ts
│       ├── components/
│       └── data/
└── package.json
```

## 🚀 배포 프로세스

### 1. 로컬 테스트

```bash
pnpm run dev     # 개발 서버
pnpm run build   # 빌드 테스트
pnpm run preview # 빌드 결과 미리보기
```

### 2. GitHub 배포

```bash
git add .
git commit -m "Migrate to VitePress"
git push origin main
```

### 3. Actions 탭에서 확인

- Workflow 실행 상태 확인
- 빌드 로그 확인
- 배포 성공 여부 확인

## 🎯 마이그레이션 체크리스트

- [x] VitePress 설치 및 설정
- [x] 컴포넌트 마이그레이션 (Vue 3 Composition API)
- [x] 테마 커스터마이징
- [x] GitHub Actions 워크플로우 업데이트
- [x] pnpm 설정
- [x] package.json에 packageManager 추가
- [x] Playground 페이지 생성
- [x] 이전 워크플로우 비활성화
- [ ] GitHub Pages 설정 확인
- [ ] 실제 배포 테스트
- [ ] DNS/도메인 설정 (필요시)

## ⚠️ 주의사항

### 1. 이전 워크플로우 삭제

`main.yml`은 현재 비활성화되어 있습니다. 완전히 삭제하려면:

```bash
rm .github/workflows/main.yml
```

### 2. gh-pages 브랜치

GitHub Pages가 Artifact 방식으로 변경되므로 `gh-pages` 브랜치는 더 이상 사용되지 않습니다.
필요시 삭제 가능:

```bash
git push origin --delete gh-pages
```

### 3. ACCESS_TOKEN 시크릿

더 이상 필요하지 않으므로 레포지토리 설정에서 삭제 가능:

- Settings → Secrets and variables → Actions
- `ACCESS_TOKEN` 삭제

## 📚 추가 리소스

- [VitePress 공식 문서](https://vitepress.dev/)
- [GitHub Pages 배포 가이드](https://vitepress.dev/guide/deploy#github-pages)
- [pnpm 공식 문서](https://pnpm.io/)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

## 🆘 문제 해결

### 빌드 실패 시:

1. Actions 탭에서 로그 확인
2. 로컬에서 `pnpm run build` 실행해서 오류 확인
3. `pnpm install`로 의존성 재설치

### 배포 안 됨:

1. Settings → Pages 설정 확인
2. Workflow 권한 확인
3. 브랜치 이름 확인 (main vs master)

### 404 오류:

1. `base` 설정 확인 (config.mts)
2. 빌드 결과물 경로 확인 (.vitepress/dist)
3. `srcDir` 설정 확인

---

**마이그레이션 완료일**: 2025-10-20
**버전**: VuePress 1.x → VitePress 2.0.0-alpha.12
