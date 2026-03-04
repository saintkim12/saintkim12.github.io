/**
 * 포트폴리오 패키지 글로벌 설정
 * 포트폴리오 경로, 사용자 정보, 네비게이션 등을 한곳에서 관리합니다.
 */

export const siteConfig = {
  // 기본 경로 (개발: /, 프로덕션: /portfolio/)
  basePath: import.meta.env.MODE === 'production' ? '/portfolio/' : '/',

  // 사이트 정보
  siteTitle: 'saintkim12 Portfolio',
  siteTagline: '웹 개발자 포트폴리오 및 이력서',
  siteDescription: '웹 개발자 포트폴리오 및 이력서',

  // 작성자 정보
  author: 'saintkim12',

  // GitHub 저장소
  githubRepo: 'saintkim12/saintkim12.github.io',
  githubRepoUrl: 'https://github.com/saintkim12/saintkim12.github.io',

  // 네비게이션 메뉴
  navLinksConfig: [
    { label: 'Portfolio', key: 'portfolioList' },
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

  // 블로그
  blog: () => '/blog/',

  // 포트폴리오 목록
  portfolioList: () => `${siteConfig.basePath}`,

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

  // 포트폴리오 목록
  portfolioList: () => ({
    title: `포트폴리오 - ${siteConfig.siteTitle}`,
    description: siteConfig.siteDescription,
  }),

  // 이력서
  resume: () => ({
    title: `이력서 - ${siteConfig.siteTitle}`,
    description: siteConfig.siteDescription,
  }),
} as const;
