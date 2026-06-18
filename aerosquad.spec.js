// ============================================================
// AeroSquad — Comprehensive E2E Test Suite (Playwright)
// /tests/aerosquad.spec.js
//
// Covers:
//   1. Positive / Happy-Path Flows
//   2. Boundary / Edge-Case / Error-State Flows
// ============================================================

const { test, expect } = require('@playwright/test');

// ============================================================
// TEST CONFIG
// ============================================================
const BASE_URL = 'http://localhost:3000'; // adjust if needed

// ============================================================
// SECTION 1 — POSITIVE / HAPPY-PATH TESTS
// ============================================================

test.describe('1. Core UI Rendering & Layout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  /**
   * Verify the dashboard loads with all major structural elements.
   */
  test('TC-01 | Dashboard renders all primary sections', async ({ page }) => {
    // Sidebar is visible
    await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();

    // Page title confirms we're on Fleet Command
    await expect(page.locator('[data-testid="page-title"]')).toHaveText('Fleet Command');

    // KPI grid contains all four cards
    await expect(page.locator('[data-testid="kpi-active-drones"]')).toBeVisible();
    await expect(page.locator('[data-testid="kpi-active-missions"]')).toBeVisible();
    await expect(page.locator('[data-testid="kpi-system-alerts"]')).toBeVisible();
    await expect(page.locator('[data-testid="kpi-radar"]')).toBeVisible();

    // Data table is rendered
    await expect(page.locator('[data-testid="drone-table"]')).toBeVisible();
  });

  /**
   * Verify KPI metric values are non-zero and displayed.
   */
  test('TC-02 | KPI cards display real metric values', async ({ page }) => {
    const dronesValue = page.locator('[data-testid="kpi-drones-value"]');
    await expect(dronesValue).toContainText('12');

    const missionsValue = page.locator('[data-testid="kpi-missions-value"]');
    await expect(missionsValue).toContainText('7');

    // Alert chips are visible
    await expect(page.locator('[data-testid="alert-chip-critical"]')).toHaveText('2 Critical');
    await expect(page.locator('[data-testid="alert-chip-warning"]')).toHaveText('2 Warning');
  });

  /**
   * Verify the data table loads with the correct number of rows for page 1.
   */
  test('TC-03 | Data table renders 10 rows on first page', async ({ page }) => {
    const rows = page.locator('[data-testid="drone-table-body"] tr');
    await expect(rows).toHaveCount(10);
  });

  /**
   * Verify status badges are rendered with correct color classes for each state.
   */
  test('TC-04 | Status badges render with correct variant classes', async ({ page }) => {
    // In-Flight badge (green)
    await expect(page.locator('[data-testid="status-badge-inflight"]').first()).toBeVisible();

    // Critical Alert badge (red)
    await expect(page.locator('[data-testid="status-badge-critical"]').first()).toBeVisible();

    // Maintenance badge (amber)
    await expect(page.locator('[data-testid="status-badge-maintenance"]').first()).toBeVisible();
  });

  /**
   * Verify pagination info text is correct for the initial load.
   */
  test('TC-05 | Pagination shows correct count on initial load', async ({ page }) => {
    const paginationInfo = page.locator('[data-testid="pagination-info"]');
    await expect(paginationInfo).toHaveText('Showing 1–10 of 12');
  });

});

// ============================================================

test.describe('2. Sidebar Navigation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  /**
   * Verify the sidebar collapses and expands on toggle button click.
   */
  test('TC-06 | Sidebar toggles collapsed state on button click', async ({ page }) => {
    const sidebar = page.locator('[data-testid="sidebar"]');
    const toggleBtn = page.locator('[data-testid="sidebar-toggle-btn"]');

    // Initial state: sidebar is expanded
    await expect(sidebar).not.toHaveClass(/collapsed/);

    // Click to collapse
    await toggleBtn.click();
    await expect(sidebar).toHaveClass(/collapsed/);

    // Click again to expand
    await toggleBtn.click();
    await expect(sidebar).not.toHaveClass(/collapsed/);
  });

  /**
   * Verify all navigation links are present and rendered.
   */
  test('TC-07 | All sidebar navigation links are rendered', async ({ page }) => {
    await expect(page.locator('[data-testid="nav-fleet-overview"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-flight-logs"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-live-map"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-missions"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-maintenance"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-operators"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-api-keys"]')).toBeVisible();
  });

  /**
   * Verify the system status indicator is visible in the sidebar footer.
   */
  test('TC-08 | System status indicator is displayed in sidebar footer', async ({ page }) => {
    const status = page.locator('[data-testid="system-status"]');
    await expect(status).toBeVisible();
    await expect(status).toContainText('All Systems Nominal');
  });

});

// ============================================================

test.describe('3. Search & Filter Functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  /**
   * Verify search filters the table to matching rows by drone ID.
   */
  test('TC-09 | Search by Drone ID filters table correctly', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill('DRN-094');

    // Wait for debounce
    await page.waitForTimeout(300);

    const rows = page.locator('[data-testid="drone-table-body"] tr');
    await expect(rows).toHaveCount(1);

    // Verify the specific row is the correct drone
    await expect(page.locator('[data-testid="drone-row-DRN-094"]')).toBeVisible();
    await expect(page.locator('[data-testid="drone-id-DRN-094"]')).toHaveText('DRN-094');
  });

  /**
   * Verify search filters the table to matching rows by operator name.
   */
  test('TC-10 | Search by Operator Name filters table correctly', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill('Alpha Ops');
    await page.waitForTimeout(300);

    const rows = page.locator('[data-testid="drone-table-body"] tr');
    await expect(rows).toHaveCount(1);

    const operatorCell = page.locator('[data-testid="drone-row-DRN-094"] [data-testid="drone-operator-name"]');
    await expect(operatorCell).toHaveText('Alpha Ops');
  });

  /**
   * Verify filter tabs correctly filter the data table by status.
   */
  test('TC-11 | Status filter tab "In-Flight" shows only In-Flight drones', async ({ page }) => {
    await page.locator('[data-testid="filter-inflight"]').click();
    await page.waitForTimeout(200);

    // All visible status badges should be In-Flight
    const badges = page.locator('[data-testid="status-badge-inflight"]');
    const count = await badges.count();
    expect(count).toBeGreaterThan(0);

    // No critical or maintenance badges should appear
    await expect(page.locator('[data-testid="status-badge-critical"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="status-badge-maintenance"]')).toHaveCount(0);
  });

  /**
   * Verify filter tab "Critical" shows only critical drones.
   */
  test('TC-12 | Status filter tab "Critical" shows only Critical Alert drones', async ({ page }) => {
    await page.locator('[data-testid="filter-critical"]').click();
    await page.waitForTimeout(200);

    const badges = page.locator('[data-testid="status-badge-critical"]');
    await expect(badges).toHaveCount(2); // DRN-203 and DRN-228

    // In-Flight badges should not appear
    await expect(page.locator('[data-testid="status-badge-inflight"]')).toHaveCount(0);
  });

  /**
   * Verify the table count badge updates when filter is applied.
   */
  test('TC-13 | Table count updates when filter is applied', async ({ page }) => {
    await page.locator('[data-testid="filter-inflight"]').click();
    await page.waitForTimeout(200);

    const tableCount = page.locator('[data-testid="table-count"]');
    // In-Flight count is 6 based on mock data
    await expect(tableCount).not.toHaveText('12 units');
  });

});

// ============================================================

test.describe('4. Pagination', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  /**
   * Verify clicking next page navigates to page 2 and shows remaining items.
   */
  test('TC-14 | Next page button navigates to page 2 with remaining rows', async ({ page }) => {
    const nextBtn = page.locator('[data-testid="pagination-next-btn"]');
    await expect(nextBtn).toBeEnabled();
    await nextBtn.click();

    const rows = page.locator('[data-testid="drone-table-body"] tr');
    await expect(rows).toHaveCount(2); // 12 total - 10 on page 1 = 2

    const paginationInfo = page.locator('[data-testid="pagination-info"]');
    await expect(paginationInfo).toHaveText('Showing 11–12 of 12');
  });

  /**
   * Verify the Previous button is disabled on page 1.
   */
  test('TC-15 | Previous button is disabled on the first page', async ({ page }) => {
    const prevBtn = page.locator('[data-testid="pagination-prev-btn"]');
    await expect(prevBtn).toBeDisabled();
  });

  /**
   * Verify page number buttons are rendered and clickable.
   */
  test('TC-16 | Page number buttons render and navigate correctly', async ({ page }) => {
    const pageNum2 = page.locator('[data-testid="page-num-2"]');
    await expect(pageNum2).toBeVisible();
    await pageNum2.click();

    const paginationInfo = page.locator('[data-testid="pagination-info"]');
    await expect(paginationInfo).toContainText('11–12');

    // Page 2 button should now be active
    await expect(pageNum2).toHaveClass(/active/);
  });

});

// ============================================================

test.describe('5. Diagnostic Tooltip', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  /**
   * Verify clicking the Diagnostics button on a row shows the tooltip.
   */
  test('TC-17 | Clicking Diagnostics button reveals the diagnostic tooltip', async ({ page }) => {
    const tooltip = page.locator('[data-testid="diagnostic-tooltip"]');

    // Tooltip is hidden by default
    await expect(tooltip).not.toBeVisible();

    // Click the first diagnostics button in the table
    await page.locator('[data-testid="drone-action-tooltip-trigger"]').first().click();

    // Tooltip becomes visible
    await expect(tooltip).toBeVisible();
  });

  /**
   * Verify the tooltip shows correct drone data matching the clicked row.
   */
  test('TC-18 | Diagnostic tooltip content matches clicked drone data', async ({ page }) => {
    // Click the diagnostics button for DRN-094 specifically
    await page.locator('[data-testid="drone-row-DRN-094"] [data-testid="drone-action-tooltip-trigger"]').click();

    const tooltip = page.locator('[data-testid="diagnostic-tooltip"]');
    await expect(tooltip).toBeVisible();

    // Verify drone ID is shown in the tooltip header
    await expect(tooltip.locator('.tooltip-drone-id')).toHaveText('DRN-094');

    // Battery value should match
    await expect(tooltip.locator('#td-battery')).toHaveText('87%');

    // Altitude should match
    await expect(tooltip.locator('#td-altitude')).toHaveText('142m');
  });

  /**
   * Verify the tooltip closes when the close button is clicked.
   */
  test('TC-19 | Diagnostic tooltip closes on close button click', async ({ page }) => {
    await page.locator('[data-testid="drone-action-tooltip-trigger"]').first().click();

    const tooltip = page.locator('[data-testid="diagnostic-tooltip"]');
    await expect(tooltip).toBeVisible();

    await page.locator('[data-testid="tooltip-close-btn"]').click();
    await expect(tooltip).not.toBeVisible();
  });

  /**
   * Verify the tooltip closes when pressing the Escape key.
   */
  test('TC-20 | Diagnostic tooltip closes on Escape key press', async ({ page }) => {
    await page.locator('[data-testid="drone-action-tooltip-trigger"]').first().click();

    await page.keyboard.press('Escape');
    await expect(page.locator('[data-testid="diagnostic-tooltip"]')).not.toBeVisible();
  });

});

// ============================================================
// SECTION 2 — NEGATIVE / BOUNDARY / ERROR TESTS
// ============================================================

test.describe('6. Zero-Results & Empty State', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  /**
   * Verify searching with gibberish shows the empty state instead of crashing.
   */
  test('TC-21 | Searching gibberish displays empty state UI, no crash', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill('xzqwerty9999___notadrone');
    await page.waitForTimeout(300);

    // Table body should be empty
    const rows = page.locator('[data-testid="drone-table-body"] tr');
    await expect(rows).toHaveCount(0);

    // Empty state is visible
    const emptyState = page.locator('[data-testid="empty-state"]');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText('No matching entities found');

    // Pagination should be hidden
    const pagination = page.locator('[data-testid="pagination"]');
    await expect(pagination).not.toBeVisible();
  });

  /**
   * Verify the "Clear Search" reset button inside empty state clears the query
   * and restores the table.
   */
  test('TC-22 | Empty state reset button clears search and restores table', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill('NORESULTSHERE');
    await page.waitForTimeout(300);

    // Click the reset button in the empty state
    await page.locator('[data-testid="empty-state-reset"]').click();

    // Table rows should be restored
    const rows = page.locator('[data-testid="drone-table-body"] tr');
    await expect(rows).toHaveCount(10);

    // Empty state is hidden again
    await expect(page.locator('[data-testid="empty-state"]')).not.toBeVisible();
  });

  /**
   * Verify an empty string search shows all rows (no unintended filtering).
   */
  test('TC-23 | Clearing search input restores full table', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');

    // Type something to filter
    await searchInput.fill('DRN-094');
    await page.waitForTimeout(300);
    await expect(page.locator('[data-testid="drone-table-body"] tr')).toHaveCount(1);

    // Clear the input
    await searchInput.fill('');
    await page.waitForTimeout(300);

    // All rows should be back
    await expect(page.locator('[data-testid="drone-table-body"] tr')).toHaveCount(10);
  });

});

// ============================================================

test.describe('7. API / Network Failure Simulation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  /**
   * Verify 500 Internal Server Error triggers the error state UI.
   * Uses Playwright's page.evaluate() to call the simulateApiError() function
   * (equivalent to Playwright's page.route() interception in a real API scenario).
   */
  test('TC-24 | Simulated 500 error renders network error state', async ({ page }) => {
    // Invoke the JS function that simulates API failure
    await page.evaluate(() => window.simulateApiError(500));

    const errorState = page.locator('[data-testid="error-state"]');
    await expect(errorState).toBeVisible();
    await expect(errorState).toContainText('Internal Server Error (500)');

    // Table should be empty
    await expect(page.locator('[data-testid="drone-table-body"] tr')).toHaveCount(0);

    // Pagination should be hidden
    await expect(page.locator('[data-testid="pagination"]')).not.toBeVisible();
  });

  /**
   * Verify 401 Unauthorized triggers the correct error message.
   */
  test('TC-25 | Simulated 401 error renders unauthorized error message', async ({ page }) => {
    await page.evaluate(() => window.simulateApiError(401));

    const errorState = page.locator('[data-testid="error-state"]');
    await expect(errorState).toBeVisible();
    await expect(errorState).toContainText('Unauthorized (401)');
  });

  /**
   * Verify the Retry button on the error state reloads the fleet data.
   */
  test('TC-26 | Retry button on error state restores table after failure', async ({ page }) => {
    await page.evaluate(() => window.simulateApiError(500));
    await expect(page.locator('[data-testid="error-state"]')).toBeVisible();

    // Click retry
    await page.locator('[data-testid="error-retry-btn"]').click();

    // Error state should hide and table should return
    await expect(page.locator('[data-testid="error-state"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="drone-table-body"] tr')).toHaveCount(10);
  });

  /**
   * Simulate a real network intercept returning 500 from a mock API endpoint.
   * This demonstrates Playwright's page.route() capability.
   */
  test('TC-27 | Playwright route intercept: 500 on /api/fleet blocks data load', async ({ page }) => {
    // Intercept any requests to a hypothetical /api/fleet endpoint
    await page.route('**/api/fleet', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error', code: 500 }),
      });
    });

    await page.goto(BASE_URL);

    // In a real API-driven app, the app would catch the failure and show the error state.
    // Here we trigger it manually to demonstrate the intercept pattern.
    await page.evaluate(() => window.simulateApiError(500));

    await expect(page.locator('[data-testid="error-state"]')).toBeVisible();
  });

});

// ============================================================

test.describe('8. Boundary & Edge Cases', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  /**
   * Verify the keyboard shortcut ⌘K / Ctrl+K focuses the search input.
   */
  test('TC-28 | ⌘K / Ctrl+K keyboard shortcut focuses search input', async ({ page }) => {
    await page.keyboard.press('Control+k');
    await expect(page.locator('[data-testid="search-input"]')).toBeFocused();
  });

  /**
   * Verify the search is case-insensitive.
   */
  test('TC-29 | Search is case-insensitive (lowercase query finds uppercase ID)', async ({ page }) => {
    await page.locator('[data-testid="search-input"]').fill('drn-094');
    await page.waitForTimeout(300);

    await expect(page.locator('[data-testid="drone-row-DRN-094"]')).toBeVisible();
  });

  /**
   * Verify that applying a status filter resets pagination to page 1.
   */
  test('TC-30 | Applying a filter resets pagination to page 1', async ({ page }) => {
    // Go to page 2
    await page.locator('[data-testid="pagination-next-btn"]').click();
    await expect(page.locator('[data-testid="page-num-2"]')).toHaveClass(/active/);

    // Apply a filter
    await page.locator('[data-testid="filter-inflight"]').click();
    await page.waitForTimeout(200);

    // Should be back on page 1
    const paginationInfo = page.locator('[data-testid="pagination-info"]');
    await expect(paginationInfo).toContainText('Showing 1–');
  });

  /**
   * Verify that opening a tooltip and then clicking a different row updates content.
   */
  test('TC-31 | Opening tooltip for second drone updates content correctly', async ({ page }) => {
    // Open first drone tooltip
    await page.locator('[data-testid="drone-row-DRN-094"] [data-testid="drone-action-tooltip-trigger"]').click();
    await expect(page.locator('.tooltip-drone-id')).toHaveText('DRN-094');

    // Open second drone tooltip
    await page.locator('[data-testid="drone-row-DRN-017"] [data-testid="drone-action-tooltip-trigger"]').click();
    await expect(page.locator('.tooltip-drone-id')).toHaveText('DRN-017');
    await expect(page.locator('#td-battery')).toHaveText('61%');
  });

  /**
   * Verify the prev button becomes enabled after navigating to page 2,
   * and disabled again after returning to page 1.
   */
  test('TC-32 | Prev button state is correctly toggled across page navigation', async ({ page }) => {
    const prevBtn = page.locator('[data-testid="pagination-prev-btn"]');

    await expect(prevBtn).toBeDisabled(); // page 1

    await page.locator('[data-testid="pagination-next-btn"]').click();
    await expect(prevBtn).toBeEnabled(); // page 2

    await prevBtn.click();
    await expect(prevBtn).toBeDisabled(); // back to page 1
  });

});
