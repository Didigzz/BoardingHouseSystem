#!/usr/bin/env bun

/**
 * Haven Space Vercel Deployment Script
 * 
 * This script automates the deployment of all Haven Space apps to Vercel.
 * Run with: bun run deploy:vercel
 */

import { $ } from "bun";
import { existsSync, writeFileSync } from "fs";
import { join } from "path";

const apps = [
  { name: "haven-space-public", path: "apps/(public)", buildCommand: "bun run build:public" },
  { name: "haven-space-admin", path: "apps/admin", buildCommand: "bun run build:admin" },
  { name: "haven-space-boarder", path: "apps/boarder", buildCommand: "bun run build:boarder" },
  { name: "haven-space-landlord", path: "apps/landlord", buildCommand: "bun run build:landlord" },
  { name: "haven-space-api", path: "apps/server", buildCommand: "bun run api:build" },
];

const rootDir = process.cwd();

console.log("🚀 Haven Space Vercel Deployment Script\n");

// Check if Vercel CLI is installed
try {
  await $`vercel --version`;
  console.log("✅ Vercel CLI found");
} catch (error) {
  console.error("❌ Vercel CLI not found. Please install with: bun add -g vercel");
  process.exit(1);
}

// Check if logged in
try {
  await $`vercel whoami`;
  console.log("✅ Logged in to Vercel\n");
} catch (error) {
  console.log("❌ Not logged in. Please login with: vercel login\n");
  process.exit(1);
}

console.log("📋 Apps to deploy:");
apps.forEach((app, index) => {
  console.log(`   ${index + 1}. ${app.name} (${app.path})`);
});
console.log("");

// Deploy each app
for (const app of apps) {
  console.log(`\n🔨 Deploying ${app.name}...`);
  
  const appPath = join(rootDir, app.path);
  
  // Create vercel.json for the app
  const vercelConfig = {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "framework": "nextjs",
    "installCommand": "corepack enable && bun install",
  };
  
  const vercelJsonPath = join(appPath, "vercel.json");
  writeFileSync(vercelJsonPath, JSON.stringify(vercelConfig, null, 2));
  console.log(`   ✅ Created vercel.json`);
  
  try {
    // Navigate to app directory and deploy
    process.chdir(appPath);
    
    console.log(`   📤 Running: vercel --prod`);
    await $`vercel --prod`.quiet(false);
    
    console.log(`   ✅ ${app.name} deployed successfully!\n`);
  } catch (error) {
    console.error(`   ❌ Failed to deploy ${app.name}:`, error.message);
    console.log(`   💡 Try deploying manually: cd ${app.path} && vercel --prod\n`);
  }
  
  // Return to root directory
  process.chdir(rootDir);
}

console.log("\n🎉 Deployment script completed!");
console.log("\n📝 Next steps:");
console.log("   1. Set environment variables in Vercel Dashboard for each project");
console.log("   2. Update NEXTAUTH_URL and NEXT_PUBLIC_API_URL with your deployment URLs");
console.log("   3. Run database migrations: bun run db:migrate");
console.log("   4. Test all applications\n");
