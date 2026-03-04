/**
 * 블로그 패키지 글로벌 설정
 * 블로그 경로, 사용자 정보, 네비게이션 등을 한곳에서 관리합니다.
 */

export const siteConfig = {
  // 기본 경로 (개발: /, 프로덕션: /blog/)
  basePath: import.meta.env.MODE === 'production' ? '/blog/' : '/',

  // 사이트 정보
  siteTitle: 'saintkim12 Blog',
  siteTagline: '기술 글과 개발 경험을 공유하는 블로그',
  siteDescription: '기술 글과 개발 경험을 공유하는 블로그',

  // 작성자 정보
  author: 'saintkim12',

  // GitHub 저장소
  githubRepo: 'saintkim12/saintkim12.github.io',
  githubRepoUrl: 'https://github.com/saintkim12/saintkim12.github.io',

  // 네비게이션 메뉴
  navLinksConfig: [
    { label: 'Blog', key: 'blogList' },
    {
      label: 'GitHub',
      href: 'https://github.com/saintkim12/saintkim12.github.io',
      external: true,
    },
  ],

  // 저작권
  copyrightYear: 2026,
} as const;

/**
 * 경로 헬퍼
 * basePath를 포함한 완전한 경로를 생성합니다.
 */
export const pathHelpers = {
  // 홈페이지
  home: () => '/',

  // 블로그 목록
  blogList: () => `${siteConfig.basePath}`,

  // 개별 블로그 글
  blogPost: (slug: string) => `${siteConfig.basePath}${slug}/`,

  // 포트폴리오
  portfolio: () => '/portfolio/',

  // 파비콘
  favicon: () => '/favicon.svg',
} as const;

/**
 * 메타데이터 헬퍼
 * 페이지별 메타데이터를 생성합니다.
 */
export const metaHelpers = {
  // 홈페이지
  home: () => ({
    title: `${siteConfig.siteTitle} - ${siteConfig.siteTagline}`,
    description: siteConfig.siteDescription,
  }),

  // 블로그 목록
  blogList: () => ({
    title: `블로그 - ${siteConfig.siteTitle}`,
    description: '모든 기술 글 목록',
  }),

  // 개별 글
  blogPost: (title: string, description: string) => ({
    title: `${title} - ${siteConfig.siteTitle}`,
    description,
  }),

  // 포트폴리오
  portfolio: () => ({
    title: `포트폴리오 - ${siteConfig.siteTitle}`,
    description: '웹 개발자 포트폴리오 및 이력서',
  }),
} as const;
