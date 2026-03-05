#!/usr/bin/env node

import { execSync } from 'child_process';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.dirname(__dirname);

// Inject resume frontmatter before starting dev server
function injectResumeFrontmatter() {
  const metadataPath = path.join(rootDir, 'packages/portfolio/resume-metadata.json');
  const resumeDir = path.join(rootDir, 'packages/portfolio/src/content/resume');

  if (!fs.existsSync(metadataPath)) {
    console.log('⚠️  resume-metadata.json not found - skipping frontmatter injection');
    return;
  }

  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

  Object.entries(metadata).forEach(([key, meta]) => {
    const markdownPath = path.join(resumeDir, `${key}.md`);

    if (!fs.existsSync(markdownPath)) {
      console.log(`⚠️  ${markdownPath} not found`);
      return;
    }

    const content = fs.readFileSync(markdownPath, 'utf-8');

    // Remove existing frontmatter if present
    let cleanContent = content;
    if (content.startsWith('---')) {
      const endIndex = content.indexOf('---', 3);
      if (endIndex !== -1) {
        cleanContent = content.slice(endIndex + 3).trim();
      }
    }

    // Create frontmatter
    const frontmatter = `---
title: "${meta.title}"
description: "${meta.description}"
---

`;

    // Write markdown with frontmatter
    fs.writeFileSync(markdownPath, frontmatter + cleanContent, 'utf-8');
  });
}

console.log('🚀 개발 서버 시작 중...\n');

// Inject resume frontmatter before starting
injectResumeFrontmatter();

// 두 패키지를 병렬로 실행
const packages = [
  { name: 'blog', port: 4321 },
  { name: 'portfolio', port: 4322 },
];

const processes = [];

for (const pkg of packages) {
  const pkgDir = path.join(rootDir, 'packages', pkg.name);
  console.log(`📦 ${pkg.name} 시작 (port ${pkg.port})...`);

  const proc = spawn('npm', ['run', 'dev'], {
    cwd: pkgDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: pkg.port.toString(),
    },
  });

  processes.push(proc);
}

console.log('\n✅ 개발 서버 실행 중:');
console.log('📝 블로그:      http://localhost:4321/');
console.log('💼 포트폴리오:  http://localhost:4322/\n');

// 종료 처리
process.on('SIGINT', () => {
  console.log('\n🛑 서버 종료 중...');
  processes.forEach((proc) => proc.kill());
  process.exit(0);
});
