#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.dirname(__dirname);

const sourceFile = process.argv[2];
const title = process.argv[3] || '이력서';
const description = process.argv[4] || '';

const targetFile = path.join(rootDir, 'packages/portfolio/src/content/resume/index.md');
const metadataFile = path.join(rootDir, 'packages/portfolio/resume-metadata.json');

// 파일 경로 없으면 무시
if (!sourceFile || !fs.existsSync(sourceFile)) {
  console.log('📌 이력서 파일 없음 - 무시');
  process.exit(0);
}

try {
  const content = fs.readFileSync(sourceFile, 'utf-8');
  fs.mkdirSync(path.dirname(targetFile), { recursive: true });
  fs.writeFileSync(targetFile, content, 'utf-8');

  // frontmatter 메타데이터 업데이트
  let metadata = { index: {}, detailed: {} };
  if (fs.existsSync(metadataFile)) {
    metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf-8'));
  }

  metadata.index = { title, description };
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

  console.log(`✅ 이력서 업데이트: ${targetFile}`);
  console.log(`✅ 메타데이터 설정: title="${title}", description="${description}"`);
} catch (error) {
  console.error(`❌ 오류: ${error.message}`);
  process.exit(1);
}
