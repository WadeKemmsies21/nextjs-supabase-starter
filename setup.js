#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

function run(command, ignoreError = false) {
  console.log(`\n> ${command}`);
  try {
    execSync(command, { stdio: "inherit" });
  } catch (err) {
    if (!ignoreError) throw err;
  }
}

function getCredentials() {
  const output = execSync("npx supabase status").toString();

  const urlMatch = output.match(/Project URL\s+│\s+(.*)/);
  const keyMatch = output.match(/Publishable\s+│\s+(.*)/);

  if (!urlMatch || !keyMatch) {
    throw new Error("Could not extract Supabase credentials.");
  }

  return {
    url: urlMatch[1].trim(),
    key: keyMatch[1].trim(),
  };
}

function writeEnv(url, key) {
  const envPath = ".env.local";

  const content = `
NEXT_PUBLIC_SUPABASE_URL=${url}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${key}
`;

  if (fs.existsSync(envPath)) {
    console.log("Updating existing .env.local...");
  } else {
    console.log("Creating .env.local...");
  }

  fs.writeFileSync(envPath, content.trim());
}

try {
  console.log("🚀 Starting project setup...\n");

  // Install dependencies
  run("npm install");

  // Stop if running (safe)
  run("npx supabase stop", true);

  // Start fresh
  run("npx supabase start");

  // Extract credentials
  const { url, key } = getCredentials();

  // Write env file
  writeEnv(url, key);

  console.log("\n✅ Setup complete!");
  console.log("Run: npm run dev");

} catch (error) {
  console.error("\n❌ Setup failed:", error.message);
  process.exit(1);
}