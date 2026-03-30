#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const packages = ['packages/blog', 'packages/portfolio'];
const rootDir = process.cwd();

// Inject resume frontmatter before building portfolio
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
    console.log(`✅ Injected frontmatter to ${key}.md`);
  });
}

console.log('🚀 Starting monorepo build...\n');

// Copy landing page (static HTML)
function copyLandingPage() {
  const landingSource = path.join(rootDir, 'packages/landing/index.html');
  const distDest = path.join(rootDir, 'dist/index.html');

  if (!fs.existsSync(landingSource)) {
    console.error(`❌ Landing page not found at ${landingSource}`);
    process.exit(1);
  }

  // Ensure dist directory exists
  if (!fs.existsSync(path.join(rootDir, 'dist'))) {
    fs.mkdirSync(path.join(rootDir, 'dist'), { recursive: true });
  }

  fs.copyFileSync(landingSource, distDest);
  console.log('✅ Landing page copied to dist/index.html\n');
}

// Inject resume frontmatter before building
injectResumeFrontmatter();
console.log('');

// Copy landing page first
copyLandingPage();

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
console.log('  - dist/index.html (landing)');
console.log('  - dist/blog/');
console.log('  - dist/portfolio/');
