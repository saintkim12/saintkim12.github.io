---
title: "Astro로 마크다운 기반 기술 블로그 구축하기"
description: "GitHub Pages + Astro + Content Collections를 사용한 완전 자동화된 블로그 시스템 구현기"
pubDate: 2026-01-29
tags: ["astro", "blog", "static-site-generator", "github-pages"]
author: "saintkim12"
relatedDocs:
  - "https://github.com/saintkim12/saintkim12.github.io"
---

## 시작하며

기술 블로그를 운영하고 싶었던 나는 여러 선택지 앞에 놓여 있었다.

- 블로그 플랫폼 (Medium, Dev.to)?
- 전통적인 정적 사이트 생성기 (Jekyll, Hugo)?
- 현대적인 프레임워크 (Docusaurus, VitePress)?
- 새로운 도구 (Astro)?

결국 선택한 것은 **Astro**였다. 그리고 그 선택이 정말 옳았다는 걸 지금 증명하고 있다.

이 글에서는 마크다운 기반의 완전히 자동화된 기술 블로그 시스템을 구축한 과정을 공유한다.

---

## 문제 상황

### 요구사항
1. **마크다운 중심**: 모든 글을 마크다운으로 작성하고 싶었다
2. **클로드 협업**: Claude와 함께 글을 생성하고 싶었다
3. **자동 배포**: `git push` 만으로 웹에 배포되길 원했다
4. **완전 무료**: 월간 비용이 $0이어야 했다
5. **독립적 관리**: 기존 `docs/` 폴더와 분리되어야 했다
6. **초고속**: 빌드 시간이 짧아야 했다

### 플랫폼 선택 과정

우리는 5가지 플랫폼을 비교했다:

| 플랫폼 | 마크다운 | 클로드 협업 | 빌드 속도 | 배포 | 비용 | 선택? |
|--------|----------|-----------|----------|------|------|-------|
| **Astro** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | $0 | ✅ |
| Docusaurus | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ✅ | $0 | ❌ |
| VitePress | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ✅ | $0 | ❌ |
| Jekyll | ⭐⭐⭐ | ⭐⭐ | ⭐ | ✅ | $0 | ❌ |
| Decap CMS | ⭐⭐ | ⭐ | ⭐⭐⭐ | ✅ | 유료 | ❌ |

**Astro가 우승한 이유**:
- 1초 안에 빌드 완료 (다른 도구는 5~60초)
- 파일 기반 라우팅으로 직관적
- Content Collections API로 타입 안전성 확보
- 클로드가 정확한 형식으로 파일을 생성하기 좋음

---

## 기술 결정: Content Collections API

Astro를 선택한 가장 큰 이유는 **Content Collections API**였다.

### Content Collections가 뭔가?

마크다운 파일의 프론트매터(frontmatter)를 Zod 스키마로 검증하는 기능이다.

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    relatedDocs: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

### 왜 이게 중요한가?

**Claude와 협업할 때**:
```
당신: "workspace-navigator 도구를 소개하는 글을 작성해줄래?"

Claude: (자동으로 올바른 형식으로 파일 생성)
src/content/blog/2026-01-29-workspace-navigator.md

당신: npm run dev로 확인

Claude: (만약 형식이 틀렸다면)
빌드 에러 → 명확한 에러 메시지 → 수정
```

타입 검증이 자동으로 이루어지므로, 잘못된 형식의 파일은 빌드 단계에서 즉시 감지된다.

---

## 빌드 검증

실제로 빌드해봤다:

```bash
$ npm run build

14:02:33 [build] Building static entrypoints...
14:02:34 [vite] ✓ built in 788ms
14:02:34 [build] ✓ Completed in 821ms.

 generating static routes
14:02:34 ▶ src/pages/404.astro
14:02:34   └─ /404.html (+5ms)
14:02:34 ▶ src/pages/blog/[slug].astro
14:02:34   └─ /blog/2026-01-29-hello-blog/index.html (+6ms)
14:02:34 ▶ src/pages/blog/index.astro
14:02:34   └─ /blog/index.html (+2ms)
14:02:34 ▶ src/pages/index.astro
14:02:34   └─ /index.html (+1ms)
14:02:34 ✓ Completed in 25ms.

14:02:34 [build] 4 page(s) built in 1.17s
14:02:34 [build] Complete!
```

**1.17초**. 정말 빠르다.

---

## 결론

Astro의 가장 좋은 점이 바로 이것입니다:

> **콘텐츠와 디자인의 완벽한 분리**

마크다운 파일 하나 건드리지 않고:
- 색상 테마 변경 ✅
- 레이아웃 재설계 ✅
- 테마 완전 교체 ✅

지금 바로 시작할 수 있다:

```bash
# 1. 로컬 서버 실행
npm run dev

# 2. 글 작성
# src/content/blog/2026-01-30-my-post.md 생성

# 3. 배포 (선택)
git push
```

**5분이면 첫 글을 배포할 수 있다.**
