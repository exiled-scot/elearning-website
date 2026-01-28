/**
 * Navigation E2E Tests
 *
 * Tests basic navigation and page accessibility
 */

const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('/');
    // Check for header
    await expect(page.locator('header')).toBeVisible();
  });

  test('header is visible on all pages', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();

    // Navigate to different pages and verify header
    await page.goto('/about');
    await expect(page.locator('header')).toBeVisible();

    await page.goto('/explore');
    await expect(page.locator('header')).toBeVisible();
  });

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/about');

    // Click on logo/title to go back to homepage
    await page.locator('header a').first().click();

    await expect(page).toHaveURL('/');
  });

  test('can navigate to About page', async ({ page }) => {
    await page.goto('/about');

    await expect(page).toHaveURL('/about');
  });

  test('can navigate to Explore page', async ({ page }) => {
    await page.goto('/explore');

    await expect(page).toHaveURL('/explore');
  });

  test('can navigate to MyLearning page', async ({ page }) => {
    await page.goto('/mylearning');

    await expect(page).toHaveURL('/mylearning');
  });

  test('can navigate to CloudLabs page', async ({ page }) => {
    await page.goto('/cloudlabs');

    await expect(page).toHaveURL('/cloudlabs');
  });

  test('can navigate to Projects page', async ({ page }) => {
    await page.goto('/projects');

    await expect(page).toHaveURL('/projects');
  });

  test('can navigate to SkillPaths page', async ({ page }) => {
    await page.goto('/skillpaths');

    await expect(page).toHaveURL('/skillpaths');
  });

  test('can navigate to Assessments page', async ({ page }) => {
    await page.goto('/assessments');

    await expect(page).toHaveURL('/assessments');
  });
});

test.describe('Category Navigation', () => {
  test('can navigate to Programming category', async ({ page }) => {
    await page.goto('/category/programming');

    await expect(page).toHaveURL('/category/programming');
  });

  test('can navigate to Technology category', async ({ page }) => {
    await page.goto('/category/technology');

    await expect(page).toHaveURL('/category/technology');
  });

  test('can navigate to Engineering category', async ({ page }) => {
    await page.goto('/category/engineering');

    await expect(page).toHaveURL('/category/engineering');
  });
});

test.describe('Authentication UI', () => {
  test('shows login and signup buttons when not authenticated', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Log in')).toBeVisible();
    await expect(page.getByText('Sign Up')).toBeVisible();
  });

  test('clicking login button opens login modal', async ({ page }) => {
    await page.goto('/');

    await page.getByText('Log in').click();

    // Modal should appear
    await expect(page.locator('[class*="ReactModal"]')).toBeVisible();
  });

  test('clicking signup button opens signup modal', async ({ page }) => {
    await page.goto('/');

    await page.getByText('Sign Up').click();

    // Modal should appear
    await expect(page.locator('[class*="ReactModal"]')).toBeVisible();
  });

  test('login modal contains email and password fields', async ({ page }) => {
    await page.goto('/');

    await page.getByText('Log in').click();

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('can close login modal', async ({ page }) => {
    await page.goto('/');

    await page.getByText('Log in').click();
    await expect(page.locator('[class*="ReactModal"]')).toBeVisible();

    // Close by clicking overlay or pressing escape
    await page.keyboard.press('Escape');

    await expect(page.locator('[class*="ReactModal__Content"]')).not.toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('header is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');

    await expect(page.locator('header')).toBeVisible();
  });

  test('header is responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto('/');

    await expect(page.locator('header')).toBeVisible();
  });

  test('header is responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    await expect(page.locator('header')).toBeVisible();
  });
});

test.describe('Page Loading', () => {
  test('explore page shows loading state then content', async ({ page }) => {
    await page.goto('/explore');

    // Either loading or content should be visible
    const hasLoading = await page.getByText('Loading...').isVisible().catch(() => false);
    const hasContent = await page.locator('.card-container').isVisible().catch(() => false);

    expect(hasLoading || hasContent).toBeTruthy();
  });

  test('mylearning page loads', async ({ page }) => {
    await page.goto('/mylearning');

    // Page should load successfully
    await expect(page).toHaveURL('/mylearning');
  });
});
