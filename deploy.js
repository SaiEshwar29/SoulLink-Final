#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Soul Link Deployment Helper\n');

// Check if .env exists
if (!fs.existsSync('.env')) {
    console.log('⚠️  Warning: .env file not found');
    console.log('📝 Please create .env file with your API keys before deploying\n');
}

// Check if build works
console.log('🔨 Testing build...');
try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build successful!\n');
} catch (error) {
    console.log('❌ Build failed. Please fix errors before deploying.');
    process.exit(1);
}

// Display deployment options
console.log('📋 Choose your deployment platform:\n');
console.log('1. Vercel (Recommended) - Full-stack with serverless functions');
console.log('2. Netlify - Static site with functions');
console.log('3. Railway - Full-stack with persistent server');
console.log('4. Render - Simple full-stack hosting\n');

console.log('🔧 Quick deploy commands:\n');
console.log('Vercel:');
console.log('  npm install -g vercel');
console.log('  vercel --prod\n');

console.log('Netlify:');
console.log('  npm install -g netlify-cli');
console.log('  netlify deploy --prod --dir=dist\n');

console.log('Railway:');
console.log('  1. Go to railway.app');
console.log('  2. Connect your GitHub repository');
console.log('  3. Add environment variables');
console.log('  4. Deploy automatically\n');

console.log('Render:');
console.log('  1. Go to render.com');
console.log('  2. Connect your GitHub repository');
console.log('  3. Add environment variables');
console.log('  4. Deploy\n');

console.log('📚 For detailed instructions, see HOSTING-GUIDE.md');
console.log('🔒 Don\'t forget to set your environment variables!');

// Check for common issues
console.log('\n🔍 Pre-deployment checklist:');
console.log(fs.existsSync('.env') ? '✅ .env file exists' : '❌ .env file missing');
console.log(fs.existsSync('dist') ? '✅ Build directory exists' : '❌ Run npm run build first');
console.log(fs.existsSync('vercel.json') ? '✅ Vercel config ready' : '⚠️  Vercel config missing');
console.log(fs.existsSync('netlify.toml') ? '✅ Netlify config ready' : '⚠️  Netlify config missing');
