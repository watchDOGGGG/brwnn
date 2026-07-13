// Requires `npm install -D playwright && npx playwright install chromium` (not a project dependency).
// Run with the dev server already up: node scripts/verify-auth.cjs
const { chromium } = require("playwright");

const BASE = "http://localhost:5183";

function rand() {
  return Math.random().toString(36).slice(2, 8);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on("framenavigated", (frame) => {
    if (frame === page.mainFrame()) console.log("   [nav event]", frame.url());
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  const email = `test-${rand()}@example.com`;
  const password = "password123";
  const name = "Test Sister";

  console.log("1) Signup...");
  await page.goto(`${BASE}/signup`);
  await page.fill('input[name="name"]', name);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);
  console.log("   url after submit:", page.url());
  const errorText = await page.locator("text=already exists").count();
  console.log("   error visible:", errorText > 0);
  const welcome = await page.textContent("h1");
  console.log("   h1 text:", welcome);
  if (!welcome.includes("Test")) throw new Error("Welcome message doesn't show first name");

  console.log("2) Logout...");
  const logoutCount = await page.locator('button:has-text("Logout")').count();
  console.log("   logout buttons found:", logoutCount);
  await page.click('button:has-text("Logout")');
  await page.waitForTimeout(1000);
  console.log("   url after logout click:", page.url());
  const hasLogin = await page.isVisible('a:has-text("Login")');
  console.log("   Login link visible after logout:", hasLogin);
  if (!hasLogin) throw new Error("Login link not visible after logout");

  console.log("3) Direct /dashboard visit while logged out...");
  await page.goto(`${BASE}/dashboard`);
  await page.waitForTimeout(1000);
  console.log("   url after visiting /dashboard logged out:", page.url());
  if (page.url() !== `${BASE}/login`) throw new Error(`Expected redirect to /login, got ${page.url()}`);

  console.log("4) Log back in...");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(`${BASE}/dashboard`);
  console.log("   logged in, dashboard loaded: OK");

  console.log("5) Register for an event...");
  await page.goto(`${BASE}/dashboard/events`);
  const registerBtn = page.locator('button:has-text("Register")').first();
  await registerBtn.waitFor();
  await registerBtn.click();
  await page.waitForSelector('button:has-text("✓ Going")');
  console.log("   RSVP toggled to Going: OK");

  console.log("6) Post in community...");
  await page.goto(`${BASE}/dashboard/community`);
  const postText = `Hello from automated test ${rand()}`;
  await page.fill("textarea", postText);
  await page.click('button:has-text("Post")');
  await page.waitForSelector(`text=${postText}`);
  console.log("   post appeared in feed: OK");

  console.log("7) Edit profile bio and verify persistence...");
  await page.goto(`${BASE}/dashboard/profile`);
  await page.click('button:has-text("Edit")');
  const bioText = `Bio updated by test ${rand()}`;
  await page.fill('textarea[name="bio"]', bioText);
  await page.click('button:has-text("Save")');
  await page.waitForSelector(`text=${bioText}`);
  await page.reload();
  await page.waitForSelector(`text=${bioText}`);
  console.log("   bio persisted after reload: OK");

  console.log("\nConsole errors captured:", errors.length ? errors : "none");

  await browser.close();
  console.log("\nALL CHECKS PASSED");
}

main().catch((err) => {
  console.error("FAILURE:", err.message);
  process.exit(1);
});
