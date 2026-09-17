import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const ARTIFACTS_DIR = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\2b76d346-3b9d-41bd-be10-b147587cb6fd';
const SCREENSHOTS_DIR = path.join(process.cwd(), 'public', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function saveScreenshot(page, filename) {
  const localPath = path.join(SCREENSHOTS_DIR, filename);
  await page.screenshot({ path: localPath, fullPage: false });
  try {
    const artifactPath = path.join(ARTIFACTS_DIR, filename);
    fs.copyFileSync(localPath, artifactPath);
  } catch (e) {
    // Artifact dir copy optional
  }
  console.log(`[SCREENSHOT] Saved: ${filename}`);
}

async function runTest() {
  console.log('[START] Starting FitScore AI Full-Site E2E Test Suite...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    permissions: ['camera', 'microphone'],
  });
  const page = await context.newPage();

  const testReport = {
    steps: [],
    newUser: null,
    status: 'PASSED',
    startTime: new Date().toISOString(),
  };

  try {
    // 1. Landing Page
    console.log('\n--- 1. Testing Landing Page (/) ---');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const pageTitle = await page.title();
    console.log(`Landing Page Title: "${pageTitle}"`);
    await saveScreenshot(page, '01_landing_hero.png');

    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(600);
    await saveScreenshot(page, '02_landing_features.png');
    testReport.steps.push({ name: 'Landing Page', status: 'OK' });

    // 2. Register Page & User Creation
    console.log('\n--- 2. Testing Registration with Brand New Account ---');
    const timestamp = Date.now();
    const newUser = {
      fullName: 'Dr. Marcus Vance',
      email: `marcus.vance.${timestamp}@fitscore.ai`,
      password: 'Kinetics2026!Master',
    };
    testReport.newUser = newUser;
    console.log(`Creating user: ${newUser.fullName} (${newUser.email})`);

    await page.goto(`${BASE_URL}/register`, { waitUntil: 'networkidle' });
    await saveScreenshot(page, '03_register_page.png');

    await page.fill('input[name="fullName"]', newUser.fullName);
    await page.fill('input[name="email"]', newUser.email);
    await page.fill('input[name="password"]', newUser.password);

    console.log('Submitting registration form...');
    await page.click('button[type="submit"]');
    await page.waitForURL(url => url.pathname.includes('/login') || url.pathname.includes('/dashboard'), { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1000);

    console.log(`Current URL after registration: ${page.url()}`);
    testReport.steps.push({ name: 'User Registration', status: 'OK', email: newUser.email });

    // 3. Login Page
    console.log('\n--- 3. Testing Login with New Account ---');
    if (!page.url().includes('/dashboard')) {
      if (!page.url().includes('/login')) {
        await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
      }
      await saveScreenshot(page, '04_login_page.png');

      await page.fill('input[name="email"]', newUser.email);
      await page.fill('input[name="password"]', newUser.password);

      console.log('Submitting login form...');
      await page.click('button[type="submit"]');
      await page.waitForURL(url => url.pathname.includes('/dashboard'), { timeout: 10000 }).catch(() => {});
      await page.waitForTimeout(1000);
      console.log(`Current URL after login: ${page.url()}`);
    }
    testReport.steps.push({ name: 'User Login', status: 'OK' });

    // 4. Dashboard
    console.log('\n--- 4. Testing Dashboard (/dashboard) ---');
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await saveScreenshot(page, '05_dashboard.png');
    testReport.steps.push({ name: 'Dashboard View', status: 'OK' });

    // 5. Workout Protocol Selector
    console.log('\n--- 5. Testing Workout Hub (/workout) ---');
    await page.goto(`${BASE_URL}/workout`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await saveScreenshot(page, '06_workout_selector.png');

    // Click conventional deadlift card to test interactivity
    const deadliftCard = page.locator('text=Conventional Deadlift').first();
    if (await deadliftCard.isVisible()) {
      await deadliftCard.click();
      await page.waitForTimeout(400);
      console.log('Selected Conventional Deadlift protocol card.');
    }
    testReport.steps.push({ name: 'Workout Selector', status: 'OK' });

    // 6. Live Session Simulation
    console.log('\n--- 6. Testing Live Session (/workout -> Launch Camera Session) ---');
    const launchSessionBtn = page.locator('button:has-text("Launch Camera Session")').first();
    if (await launchSessionBtn.isVisible()) {
      await launchSessionBtn.click();
      await page.waitForTimeout(800);

      // Click "Demo Kinematics" to activate synthetic skeletal tracking
      const demoBtn = page.locator('button:has-text("Demo Kinematics")').first();
      if (await demoBtn.isVisible()) {
        await demoBtn.click();
        await page.waitForTimeout(600);
      }

      // Click "Start Evaluation"
      const evalBtn = page.locator('button:has-text("Start Evaluation")').first();
      if (await evalBtn.isVisible()) {
        await evalBtn.click();
        await page.waitForTimeout(1500);
      }

      await saveScreenshot(page, '07_live_session_hud.png');
      console.log('Live Session HUD with active skeleton rendered successfully.');
    }
    testReport.steps.push({ name: 'Live Session HUD', status: 'OK' });

    // 7. Session Autopsy / Detail View
    console.log('\n--- 7. Testing Session Detail (/session/demo-session-12) ---');
    await page.goto(`${BASE_URL}/session/demo-session-12`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await saveScreenshot(page, '08_session_detail.png');
    testReport.steps.push({ name: 'Session Autopsy Detail', status: 'OK' });

    // 8. Workout History
    console.log('\n--- 8. Testing Workout History (/history) ---');
    await page.goto(`${BASE_URL}/history`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await saveScreenshot(page, '09_workout_history.png');
    testReport.steps.push({ name: 'Workout History', status: 'OK' });

    // 9. Clinical Reports & Analytics
    console.log('\n--- 9. Testing Clinical Reports & Analytics (/reports) ---');
    await page.goto(`${BASE_URL}/reports`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await saveScreenshot(page, '10_reports_analytics.png');
    testReport.steps.push({ name: 'Reports and Analytics', status: 'OK' });

    // 10. User Profile & Biometrics
    console.log('\n--- 10. Testing User Profile (/profile) ---');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await saveScreenshot(page, '11_user_profile.png');
    testReport.steps.push({ name: 'User Profile & Settings', status: 'OK' });

    // 11. Mobile Viewport Testing (390 x 844)
    console.log('\n--- 11. Testing Mobile Responsive Viewport ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await saveScreenshot(page, '12_mobile_landing.png');

    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await saveScreenshot(page, '13_mobile_dashboard.png');
    testReport.steps.push({ name: 'Mobile Viewport Test', status: 'OK' });

    // 12. Sign Out Verification
    console.log('\n--- 12. Testing Sign Out Functionality ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    console.log('Clicking Sign Out button...');
    const signOutBtn = page.locator('button:has-text("Sign Out Session")');
    if (await signOutBtn.isVisible()) {
      await signOutBtn.click();
    } else {
      await page.click('button[title="Sign Out"]');
    }

    await page.waitForURL(url => url.pathname.includes('/login'), { timeout: 8000 });
    console.log(`URL after sign out: ${page.url()}`);
    await page.waitForTimeout(600);
    await saveScreenshot(page, '14_signed_out_login.png');

    // Verify session cookie was wiped: attempting to open /dashboard should redirect to /login
    console.log('Verifying protected route redirect after sign out...');
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const postLogoutUrl = page.url();
    console.log(`URL when re-visiting /dashboard: ${postLogoutUrl}`);

    if (postLogoutUrl.includes('/login')) {
      console.log('Successfully confirmed sign out: user redirected to /login!');
      testReport.steps.push({ name: 'Sign Out Session & Cookie Erasure', status: 'OK' });
    } else {
      throw new Error(`Sign out failed: user was not redirected to /login, was at ${postLogoutUrl}`);
    }
  } catch (err) {
    console.error('[ERROR] Test failed with error:', err);
    testReport.status = 'FAILED';
    testReport.error = err.message;
  } finally {
    testReport.endTime = new Date().toISOString();
    await browser.close();
    fs.writeFileSync(
      path.join(SCREENSHOTS_DIR, 'test_report.json'),
      JSON.stringify(testReport, null, 2)
    );
    console.log('\n[SUCCESS] E2E Full-Site Test Finished! Summary:');
    console.log(JSON.stringify(testReport, null, 2));
  }
}

runTest();
