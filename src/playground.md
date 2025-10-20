---
title: Component Playground
description: VitePress 커스텀 컴포넌트 테스트 및 사용법
tags: [playground, components, vue, vitepress]
---

# Component Playground

VitePress에서 사용 가능한 모든 커스텀 컴포넌트들의 데모 및 사용법을 정리한 페이지입니다.

## 📋 목차

[[toc]]

---

## 🏷️ Tag Components

### TagLinks

현재 페이지의 태그를 표시하는 컴포넌트입니다. frontmatter에 `tags` 배열이 있으면 자동으로 렌더링됩니다.

**사용법:**

```markdown
<TagLinks />
```

**실제 동작:**

<TagLinks />

---

### TagList

모든 태그와 해당 태그가 있는 페이지 목록을 표시합니다.

**사용법:**

```markdown
<TagList />
```

::: details TagList 예시 보기
<TagList />
:::

---

## 🎨 Demo Components

### DemoComponent

간단한 데모 컴포넌트입니다.

**사용법:**

```markdown
<DemoComponent />
<!-- 또는 -->
<demo-component />
```

**실제 동작:**

<DemoComponent />

---

### OtherComponent

또 다른 데모 컴포넌트입니다.

**사용법:**

```markdown
<OtherComponent />
```

**실제 동작:**

<OtherComponent />

---

### FooBar

폴더 구조를 가진 컴포넌트 예시입니다.

**사용법:**

```markdown
<FooBar />
<!-- 또는 -->
<Foo-Bar />
```

**실제 동작:**

<FooBar />

---

## 🎭 Canvas Graphics (Konva)

Konva.js를 사용한 HTML5 Canvas 그래픽 컴포넌트들입니다.

### KonvaTest

간단한 원(Circle)을 그리는 기본 예제입니다.

**기능:**

- 200x200 픽셀 캔버스
- 마젠타 색상 원 (반지름 70px)
- 빨간색 테두리 (두께 4px)

**사용법:**

```markdown
<KonvaTest />
```

**실제 동작:**

<KonvaTest />

---

### KonvaTest2

300개의 별을 렌더링하는 고급 예제입니다. 캐싱 기능을 테스트할 수 있습니다.

**기능:**

- 600x900 픽셀 캔버스
- 300개의 랜덤 별 생성
- 드래그 가능한 캔버스
- 캐싱 옵션 (성능 최적화)

**사용법:**

```markdown
<KonvaTest2 />
```

**실제 동작:**

::: warning 성능 주의
이 컴포넌트는 300개의 도형을 렌더링합니다. "cache shapes" 체크박스를 활성화하면 성능이 향상됩니다.
:::

<KonvaTest2 />

---

## 🖼️ Image Viewer

이미지 뷰어 플러그인이 자동으로 모든 이미지에 적용됩니다.

**기능:**

- 이미지 클릭 시 확대
- 줌, 회전, 전체화면
- 갤러리 모드

**예시:**

![VitePress Logo](https://vitepress.dev/vitepress-logo-large.webp)

::: tip
이미지를 클릭해보세요! 확대 보기가 가능합니다.
:::

---

## 💬 Disqus Comments

Disqus 댓글은 각 페이지 하단에 자동으로 표시됩니다.

**비활성화 방법:**

```yaml
---
disqus: false
---
```

**기본 동작:**

- localhost에서는 표시되지 않음
- 프로덕션 환경에서만 활성화

---

## 🔧 컴포넌트 등록 방법

모든 컴포넌트는 `.vitepress/theme/index.ts`에서 전역으로 등록되어 있습니다:

```typescript
enhanceApp(ctx) {
  ctx.app.component('TagList', TagList);
  ctx.app.component('TagLinks', TagLinks);
  ctx.app.component('DemoComponent', DemoComponent);
  ctx.app.component('demo-component', DemoComponent);
  ctx.app.component('OtherComponent', OtherComponent);
  ctx.app.component('FooBar', FooBar);
  ctx.app.component('Foo-Bar', FooBar);
  ctx.app.component('KonvaTest', KonvaTest);
  ctx.app.component('KonvaTest2', KonvaTest2);
}
```

---

## 📚 추가 리소스

### VitePress 문서

- [Using Vue in Markdown](https://vitepress.dev/guide/using-vue)
- [Component Slots](https://vitepress.dev/guide/extending-default-theme#layout-slots)

### Konva.js 문서

- [Konva.js Official Docs](https://konvajs.org/)
- [Vue-Konva GitHub](https://github.com/konvajs/vue-konva)

---

## 🚀 컴포넌트 추가하기

새로운 컴포넌트를 추가하려면:

1. `.vitepress/theme/components/` 폴더에 컴포넌트 생성
2. `.vitepress/theme/index.ts`에서 import 및 등록
3. 이 페이지에 사용 예시 추가

**예시:**

```vue
<!-- .vitepress/theme/components/MyComponent.vue -->
<template>
  <div class="my-component">Hello from MyComponent!</div>
</template>

<script setup lang="ts">
// Component logic
</script>

<style scoped>
.my-component {
  color: var(--vp-c-brand-1);
}
</style>
```

```typescript
// .vitepress/theme/index.ts
import MyComponent from './components/MyComponent.vue';

enhanceApp(ctx) {
  ctx.app.component('MyComponent', MyComponent);
}
```

---

<div style="text-align: center; margin-top: 3rem; padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px;">
  <h3>🎉 모든 컴포넌트가 정상적으로 작동하는지 확인하세요!</h3>
  <p>문제가 있다면 브라우저 콘솔을 확인하거나 개발자 도구를 열어보세요.</p>
</div>
