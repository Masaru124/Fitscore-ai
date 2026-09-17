import { chromium } from "playwright";

async function testLiveSessionCamera() {
  console.log("Launching Chromium with fake camera stream...");
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      "--allow-file-access-from-files"
    ]
  });

  const context = await browser.newContext({
    permissions: ["camera"],
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  const consoleLogs = [];
  const errors = [];

  page.on("console", (msg) => {
    const text = msg.text();
    consoleLogs.push(text);
    if (msg.type() === "error" && !text.includes("favicon")) {
      errors.push(text);
    }
  });

  page.on("pageerror", (err) => {
    errors.push(err.message);
  });

  // Login with demo account
  console.log("Navigating to login page...");
  await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
  await page.fill('input[type="email"]', "demo@example.com");
  await page.fill('input[type="password"]', "demo1234");
  await page.click('button[type="submit"]');

  await page.waitForURL("**/dashboard", { timeout: 10000 });
  console.log("Successfully reached Dashboard!");

  // Navigate to workout session
  console.log("Navigating to Workout Protocol Selector...");
  await page.goto("http://localhost:3000/workout", { waitUntil: "networkidle" });

  // Click Launch Camera Session
  const launchBtn = page.locator('button:has-text("Launch Camera Session")');
  await launchBtn.waitFor({ timeout: 5000 });
  console.log("Found 'Launch Camera Session' button. Clicking...");
  await launchBtn.click();

  // Check for camera button in LiveSession HUD
  const startButton = page.locator('text="Enable Webcam (Real MoCap)"');
  await startButton.waitFor({ timeout: 5000 });
  console.log("Found webcam activation button. Clicking...");
  await startButton.click();

  // Wait for video element to have video active
  await page.waitForTimeout(2000);

  // Check if MediaPipe pose script loaded
  const hasPoseClass = await page.evaluate(() => {
    return typeof window.Pose !== "undefined";
  });
  console.log("MediaPipe Pose class available on window:", hasPoseClass);

  // Click 'Start Live Evaluation'
  const startEvalBtn = page.locator('text="Start Live Evaluation"');
  if (await startEvalBtn.isVisible()) {
    await startEvalBtn.click();
    console.log("Clicked 'Start Live Evaluation'");
  }

  // Wait 3 seconds to check reps
  await page.waitForTimeout(3000);

  // Check rep count text: Should be 0, not auto-counting!
  const repsText = await page.locator('text=/^0$/').first().isVisible();
  console.log("Rep count is strictly 0 while stationary:", repsText);

  // Take screenshot of the live viewport
  await page.screenshot({ path: "tests/camera_real_pose.png" });
  console.log("Captured screenshot: tests/camera_real_pose.png");

  console.log("Console errors encountered:", errors);

  await browser.close();
  console.log("Test completed successfully!");
}

testLiveSessionCamera().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
