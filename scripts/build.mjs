#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const packages = ['packages/blog', 'packages/portfolio'];
const rootDir = process.cwd();

console.log('🚀 Starting monorepo build...\n');

for (const pkg of packages) {
  const pkgDir = path.join(rootDir, pkg);
  const pkgName = path.basename(pkg);

  console.log(`📦 Building ${pkgName}...`);

  try {
    // Check if package.json exists
    const pkgJsonPath = path.join(pkgDir, 'package.json');
    if (!fs.existsSync(pkgJsonPath)) {
      console.error(`❌ package.json not found in ${pkgDir}`);
      process.exit(1);
    }

    // Install dependencies
    console.log(`  📥 Installing dependencies...`);
    execSync('npm install', { cwd: pkgDir, stdio: 'inherit' });

    // Build
    console.log(`  🔨 Building...`);
    execSync('npm run build', { cwd: pkgDir, stdio: 'inherit' });

    console.log(`✅ ${pkgName} built successfully\n`);
  } catch (error) {
    console.error(`❌ Failed to build ${pkgName}`);
    console.error(error.message);
    process.exit(1);
  }
}

console.log('✨ All packages built successfully!');
console.log('\n📂 Build output:');
console.log('  - dist/blog/');
console.log('  - dist/portfolio/');
