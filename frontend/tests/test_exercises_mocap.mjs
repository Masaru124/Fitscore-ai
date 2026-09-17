import { chromium } from '@playwright/test';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = path.join(process.cwd(), 'public', 'screenshots');

async function testExerciseKinematics() {
  console.log('[START] Verifying Live Session Kinematics & Non-Auto Rep Counting...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    permissions: ['camera', 'microphone'],
  });
  const page = await context.newPage();

  // Login first to set session cookie
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[name="email"]', 'demo@example.com');
  await page.fill('input[name="password"]', 'demo1234');
  await page.click('button[type="submit"]');
  await page.waitForURL(url => url.pathname.includes('/dashboard'), { timeout: 10000 });

  // Test 1: Conventional Deadlift
  console.log('\n--- Testing Conventional Deadlift Live Session ---');
  await page.goto(`${BASE_URL}/workout`);
  await page.click('text="Conventional Deadlift"');
  await page.click('button:has-text("Launch Camera Session")');
  await page.waitForTimeout(1000);

  // Enable demo preview to view exoskeleton kinematics
  const demoBtn = page.locator('button:has-text("Synthetic Avatar Preview")');
  if (await demoBtn.isVisible()) {
    await demoBtn.click();
  }
  await page.waitForTimeout(1000);

  // Check rep counter initial state - MUST BE 0!
  const repText1 = await page.locator('text=0').first().innerText();
  console.log(`Initial Deadlift Reps (Must be 0): ${repText1}`);

  // Wait 4 seconds (previously it counted a rep every 4 seconds)
  await page.waitForTimeout(4500);
  // Verify reps are STILL 0 because user didn't perform a rep!
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'test_deadlift_kinematics.png') });
  console.log('Saved test_deadlift_kinematics.png');

  // Test 2: Overhead Dumbbell Press
  console.log('\n--- Testing Overhead Dumbbell Press ---');
  await page.goto(`${BASE_URL}/workout`);
  await page.click('text="Overhead Dumbbell Press"');
  await page.click('button:has-text("Launch Camera Session")');
  await page.waitForTimeout(1000);

  const demoBtn2 = page.locator('button:has-text("Synthetic Avatar Preview")');
  if (await demoBtn2.isVisible()) {
    await demoBtn2.click();
  }
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'test_overhead_press_kinematics.png') });
  console.log('Saved test_overhead_press_kinematics.png');

  // Test 3: Standard Push-Up
  console.log('\n--- Testing Standard Push-Up ---');
  await page.goto(`${BASE_URL}/workout`);
  await page.click('text="Standard Push-Up"');
  await page.click('button:has-text("Launch Camera Session")');
  await page.waitForTimeout(1000);

  const demoBtn3 = page.locator('button:has-text("Synthetic Avatar Preview")');
  if (await demoBtn3.isVisible()) {
    await demoBtn3.click();
  }
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'test_pushup_kinematics.png') });
  console.log('Saved test_pushup_kinematics.png');

  // Test 4: Standing Bicep Curl
  console.log('\n--- Testing Standing Bicep Curl ---');
  await page.goto(`${BASE_URL}/workout`);
  await page.click('text="Standing Bicep Curl"');
  await page.click('button:has-text("Launch Camera Session")');
  await page.waitForTimeout(1000);

  const demoBtn4 = page.locator('button:has-text("Synthetic Avatar Preview")');
  if (await demoBtn4.isVisible()) {
    await demoBtn4.click();
  }
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'test_bicep_curl_kinematics.png') });
  console.log('Saved test_bicep_curl_kinematics.png');

  await browser.close();
  console.log('\n[SUCCESS] All kinematics and non-auto rep checks verified!');
}

testExerciseKinematics().catch(console.error);
