import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/')
})

test('1. assert start number of cars = 10', async ({ page }) => {
  await page.waitForTimeout(500)
  const carsRowCount = await page.locator('[data-test="cars-table-row"]').count()
  expect(carsRowCount).toBe(10)
})

test('2. assert that after setting brand filter to "Audi" cars are "Audi" ', async ({ page }) => {
  await page.locator('[data-test="car-brand"]').selectOption('Audi')

  const carsRowCount = await page.locator('[data-test="cars-table-row"]').count()

  await page.waitForTimeout(500)

  for (let i = 0; i < carsRowCount; i++) {
    const cell = await page.locator('[data-test="cars-table-row"]').nth(i).locator('[data-test="cars-table-brand"]').textContent()

    expect(cell).toBe('Audi')
  }
})

test('3. assert that after setting status filter to "Returning", only cars are of that status are shown', async ({ page }) => {
  await page.locator('[data-test="car-status"]').nth(0).click()
  await page.locator('[data-test="car-status"]').nth(0).selectOption('Returning')
  await page.waitForTimeout(500)

  const carsRowCount = await page.locator('[data-test="cars-table-row"]').count()

  for (let i = 0; i < carsRowCount; i++) {
    const cell = await page.locator('[data-test="cars-table-row"]').nth(i).locator('[data-test="cars-table-status"]').textContent()

    expect(cell).toBe('Returning')
  }
})

test('4. assert that after setting code filter to "om", all displayed cars have "om" in their code', async ({ page }) => {
  await page.locator('[data-test="car-code"]').nth(0).fill('OM')

  await page.waitForTimeout(500)

  const carsRowCount = await page.locator('[data-test="cars-table-row"]').count()

  await page.waitForTimeout(500)

  for (let i = 0; i < carsRowCount; i++) {
    const cell = await page.locator('[data-test="cars-table-row"]').nth(i).locator('[data-test="cars-table-code"]').textContent()

    expect(cell).toContain('OM')
  }
})

test('5. assert that after setting description filter to "comp" all displayed cars have "comp" in their description', async ({ page }) => {
  await page.locator('[data-test="car-description"]').nth(0).fill('comp')

  await page.waitForTimeout(500)

  const carsRowCount = await page.locator('[data-test="cars-table-row"]').count()

  await page.waitForTimeout(500)

  for (let i = 0; i < carsRowCount; i++) {
    let cell = await page.locator('[data-test="cars-table-row"]').nth(i).locator('[data-test="cars-table-description"]').textContent()

    cell = cell.toLowerCase()

    expect(cell).toContain('comp')
  }
})
