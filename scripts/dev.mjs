#!/usr/bin/env node

import { execSync } from 'child_process';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.dirname(__dirname);

console.log('🚀 개발 서버 시작 중...\n');

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
