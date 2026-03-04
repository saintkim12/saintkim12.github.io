# saintkim12.github.io

Astro로 구축하고 GitHub Pages에 배포되는 블로그와 포트폴리오를 포함한 모노레포입니다.

## 프로젝트 구조

```
saintkim12.github.io/
├── packages/
│   ├── blog/              # 블로그 패키지 (/blog에 배포)
│   │   ├── src/
│   │   │   ├── content/   # Markdown 블로그 글
│   │   │   ├── pages/     # 블로그 페이지
│   │   │   ├── layouts/   # 공유 레이아웃
│   │   │   └── styles/    # CSS 스타일
│   │   ├── astro.config.mjs
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── portfolio/         # 포트폴리오 패키지 (/portfolio에 배포)
│       ├── src/
│       │   ├── content/   # 이력서 콘텐츠
│       │   ├── pages/     # 포트폴리오 페이지
│       │   ├── layouts/   # 공유 레이아웃
│       │   └── styles/    # CSS 스타일
│       ├── astro.config.mjs
│       ├── package.json
│       └── tsconfig.json
│
├── scripts/
│   ├── build.mjs          # 모노레포 빌드 스크립트
│   ├── dev.mjs            # 병렬 개발 서버 실행
│   └── setup-resume.mjs   # 이력서 파일 설정 유틸
│
├── dist/                  # 빌드 출력 (자동 생성)
│   ├── blog/
│   └── portfolio/
│
├── package.json
├── .gitignore
└── README.md
```

## 빠른 시작

### 모든 패키지 빌드

```bash
npm run build
```

다음 작업을 수행합니다:
1. `packages/blog`와 `packages/portfolio`에 의존성 설치
2. 블로그 패키지를 `dist/blog/`로 빌드
3. 포트폴리오 패키지를 `dist/portfolio/`로 빌드

### 미리보기

`dist/` 디렉토리를 로컬 HTTP 서버로 제공합니다:

```bash
# Python 사용
python -m http.server 8000 --directory dist

# 또는 Node.js http-server 사용
npx http-server dist
```

다음 주소 방문:
- http://localhost:8000/blog/
- http://localhost:8000/portfolio/

## 개발

### 개발 워크플로우 (루트 레벨)

두 개발 서버를 동시에 실행:

```bash
npm run dev
```

병렬로 실행되는 개발 서버:
- 블로그: http://localhost:4321/ (/blog 베이스 경로 제공)
- 포트폴리오: http://localhost:4322/ (/portfolio 베이스 경로 제공)

### 개별 패키지 개발

#### 블로그 개발

```bash
cd packages/blog
npm install
npm run dev
```

http://localhost:4321/ 방문

#### 포트폴리오 개발

```bash
cd packages/portfolio
npm install
npm run dev
```

http://localhost:4321/ 방문 (루트에서 실행할 때는 포트 4322)

## 스크립트 참고

### 사용 가능한 스크립트

```bash
# 개발 (블로그 + 포트폴리오 병렬 서버)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 사이트 로컬에서 미리보기
npm run preview

# 이력서 파일 설정 (포트폴리오 패키지로 복사)
npm run setup-resume
```

### 각 스크립트 설명

- **`npm run dev`**: 병렬 개발 서버 실행 (블로그 4321, 포트폴리오 4322) 핫 리로드 지원
- **`npm run build`**: 의존성을 설치하고 두 패키지를 `dist/` 디렉토리로 빌드
- **`npm run preview`**: 빌드된 `dist/` 디렉토리를 로컬에서 제공하여 프로덕션 출력 테스트
- **`npm run setup-resume`**: (선택사항) 이력서 파일을 복사하는 유틸리티 - 보통 필요 없음

## 블로그 글 작성

`packages/blog/src/content/blog/`에 새 파일 생성:

```markdown
---
title: "글 제목"
description: "간단한 설명"
pubDate: 2026-01-30
tags: ["태그1", "태그2"]
author: "saintkim12"
relatedDocs: ["https://example.com"]
---

# 여기에 콘텐츠 작성

이곳이 블로그 글의 본문입니다.
```

파일은 자동으로 인식되어 `https://saintkim12.github.io/blog/[slug]/`에서 렌더링됩니다.

## 배포

리포지토리는 자동 배포를 위해 GitHub Actions를 사용합니다. main 브랜치에 push하면:

1. GitHub Actions가 모든 패키지 빌드
2. 빌드 출력이 GitHub Pages에 배포
3. 블로그: https://saintkim12.github.io/blog/
4. 포트폴리오: https://saintkim12.github.io/portfolio/

## 기술 스택

- **Astro 4.x**: 정적 사이트 생성기
- **TypeScript**: 타입 안전 개발
- **Markdown**: 콘텐츠 형식
- **CSS**: 다크모드 지원 스타일링
- **GitHub Pages**: 호스팅
- **GitHub Actions**: CI/CD

## 기능

- ✅ Markdown 기반 블로그 글
- ✅ Zod 검증이 있는 Content Collections
- ✅ 다크모드 지원
- ✅ 반응형 디자인
- ✅ 빠른 빌드 (< 1초)
- ✅ 자동 배포
- ✅ SEO 최적화
- ✅ JavaScript 불필요 (순수 정적 HTML)

## 중요 참고사항 & 아키텍처

### 파일 중복 ⚠️

현재 패키지 전체에 걸쳐 중복된 파일이 있습니다 (개발 과정의 잔재):

**중복된 파일:**
- `packages/blog/src/layouts/BlogLayout.astro` ↔ `packages/portfolio/src/layouts/BlogLayout.astro`
- `packages/blog/src/styles/global.css` ↔ `packages/portfolio/src/styles/global.css`
- `packages/blog/tsconfig.json` ↔ `packages/portfolio/tsconfig.json`

**영향:** 낮음 - 하지만 CSS나 레이아웃을 업데이트할 때 유지보수 부담 증가

**향후 개선:** 공유 레이아웃과 스타일을 `packages/shared/` 디렉토리로 추출

### 이력서 관리

이력서 파일은 이 리포지토리에 직접 저장됩니다:
- **위치:** `packages/portfolio/src/content/resume/index.md`
- **배포:** GitHub Pages 빌드에 자동 포함
- **외부 동기화 불필요** - `.md` 파일 변경 → 커밋 → push → 자동 배포

이전에 검토했던 private 리포지토리에서 동기화하는 방안은 단순성을 위해 포기했습니다.

### 디렉토리 정리

- **`packages/blog/src/pages/blog_old/`** - 빈 디렉토리 (레거시 잔재), 안전하게 삭제 가능

### Content Collections

두 패키지 모두 Zod 검증이 있는 Astro Content Collections 사용:
- **블로그:** `packages/blog/src/content/config.ts` - 블로그 프론트매터 검증
- **포트폴리오:** `packages/portfolio/src/content/config.ts` - 이력서 프론트매터 검증

이 스키마의 변경은 허용되는 블로그/이력서 필드에 영향을 줍니다.

## 리포지토리 통계

- **총 패키지:** 2개 (블로그 + 포트폴리오)
- **빌드 의존성:** ~300 MB (패키지당 149 MB node_modules)
- **총 블로그 글:** 4개
- **배포:** GitHub Pages (main 브랜치에 push 시 자동)
- **마지막 업데이트:** git log에서 확인

## 문제 해결

### 빌드 실패: "Cannot find module"

```bash
# 의존성 깨끗하게 재설치
rm -rf packages/*/node_modules
npm run build
```

### 개발 서버가 핫 리로드되지 않음

```bash
# 개발 서버 재시작
npm run dev
```

### 미리보기가 프로덕션과 다름

```bash
# 빌드된 출력을 테스트하고 있는지 확인
npm run build
npm run preview
```

### 포트폴리오에 이력서가 표시되지 않음

```bash
# 이력서 파일이 존재하는지 확인
ls packages/portfolio/src/content/resume/

# 다시 생성하도록 재빌드
npm run build
```

## 성능 참고사항

- **빌드 시간:** 패키지당 < 1초 (Astro v4.8.0)
- **JavaScript 미포함:** 순수 정적 HTML/CSS (빠른 로딩)
- **다크모드:** CSS 미디어 쿼리 (테마 전환 JS 없음)

## 라이선스

MIT
