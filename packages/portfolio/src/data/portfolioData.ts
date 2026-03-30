export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  github?: string;
  technologies: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  // Projects coming soon
];
