export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: 'boopd',
    company: '(주)부동산빅뱅',
    position: '웹 개발자',
    period: '2026.01 ~ 2026.03',
    description: 'Claude Code를 활용한 부피디 서비스 전체 프론트엔드 아키텍처 설계 및 구현',
    achievements: [
      '관리자(React CRA), 사용자(Next.js, 9페이지), 랜딩페이지(Vite+Preact) 개발',
      '모바일앱(React Native)을 웹뷰로 통합',
      'AI 기반 코드 생성으로 개발 속도 단축',
      '스타일 시스템 현대화',
      '개발 표준 수립',
    ],
    technologies: [
      'React 19',
      'Next.js 16',
      'React Native',
      'TypeScript',
      'Panda CSS',
      'Tailwind CSS',
      'Vite',
      'Preact',
      'Leaflet',
      'D3-delaunay',
      'Zustand',
      'Recharts',
      'shadcn/ui',
      'Firebase',
      'Google OAuth',
      'SCSS',
      'Node.js',
      'Figma',
    ],
  },
  {
    id: 'skylink',
    company: '(주)스카이링크',
    position: '웹 개발자',
    period: '2022.09 ~ 2025.06',
    description: '웨이브온 서비스 개발/유지보수',
    achievements: [
      '회사의 주 서비스인 웨이브온 개발 및 유지보수',
      '노코드 비즈니스 툴의 전반적인 기능 개발',
      '성능 최적화 담당',
      '배포 자동화 담당',
    ],
    technologies: [
      'Vue.js',
      'Node.js',
      'AWS Lambda',
      'AWS EC2',
      'MySQL',
      'DynamoDB',
      'OpenSearch',
      'Jenkins',
      'Docker',
    ],
  },
  {
    id: 'synergy',
    company: '(주)시너지시스템즈',
    position: '웹 개발자',
    period: '2021.05 ~ 2022.02',
    description: '스마트파인더 V2 (MES/POP 솔루션) 차세대 버전 개발',
    achievements: [
      '기존 .Net/C# 기반 레거시 솔루션을 Java/Vue.js 기반으로 리팩토링',
      '프로토타입 개발',
      'JSON 설정 기반 동적 화면 생성 시스템 구현',
    ],
    technologies: [
      'Spring Boot',
      'Vue.js 3',
      'Vitejs',
      'MS-SQL',
      'Java',
      'JavaScript',
    ],
  },
];
