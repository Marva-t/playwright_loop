// @ts-check
const { test, expect } = require('@playwright/test');
const exp = require('constants');
// Parsing JSON data file to be used in test
const testData = JSON.parse(JSON.stringify(require("../test-scenarios.json")))

// Setting tasks array to variable to be used in tests for verifying correct item in columns
const tasks = testData.tasks
// Function that takes text parameter to create test specific selector 
const taskSelector = (text) => {
    const selector = `//*[contains(text(), '${text}')]/parent::div/div/span`
    return selector
}


    test.beforeEach(async ({ page}) => {
        // Navigating to Demo App
        await page.goto(testData.url);
        // Enter username+password and click sign in to ensure login function
        await page.fill('#username', testData.username);
        await page.fill('#password', testData.password);
        await page.getByRole('button', {name: /sign in/i }).click();
        // Ensure login page has loaded
        await expect(page.locator("h1", {hasText: 'Web Application'})).toBeVisible()      
    });

        test('Test Case 1', async ({ page }) => {
        const text = tasks[0].text
        // Check Implement user authentication is in To Do column
            await expect(page.locator(testData.toDoColumnSelector)).toContainText(text)
        // Confirm tags: "Feature" "High Priority"
        await expect(page.locator(taskSelector(text))).toHaveText([testData.featureTag, testData.highPriorityTag]) 
        });

        test('Test Case 2', async ({ page }) => {
        const text = tasks[1].text
        // Check Fix navigation bug is in To Do column
            await expect(page.locator(testData.toDoColumnSelector)).toContainText(text)
        // Confirm tags: "Bug"
        await expect(page.locator(taskSelector(text))).toHaveText(testData.bugTag) 
        });

        test('Test Case 3', async ({ page }) => {
        const text = tasks[2].text
        // Check Design system updates is in In Progress column
            await expect(page.locator(testData.inProgressColumnSelector)).toContainText(text)
        // Confirm tags: "Design"
        await expect(page.locator(taskSelector(text))).toHaveText(testData.designTag) 
        });
        
        test('Test Case 4', async ({ page }) => {
        const text = tasks[3].text
        // Navigate to Mobile Application
        await page.getByRole('button', { name: 'Mobile Application'}).click()
        // Verify Push notification is in To Do Column
        await expect(page.locator(testData.toDoColumnSelector)).toContainText(text)
        // Confirm tags: "Feature" 
        await expect(page.locator(taskSelector(text))).toHaveText(testData.featureTag) 
        });
        
        test('Test Case 5', async ({ page }) => {
        const text = tasks[4].text
        // Navigate to Mobile Application
        await page.getByRole('button', { name: 'Mobile Application'}).click()
        // Verify Offline mode is in the In Progress Column
        await expect(page.locator(testData.inProgressColumnSelector)).toContainText(text)
        // Confirm tags: "Feature" and "High Priority"
            await expect(page.locator(taskSelector(text))).toHaveText([testData.featureTag, testData.highPriorityTag])
    
        });
        
        test('Test Case 6', async ({ page }) => {
        const text = tasks[5].text
        // Navigate to Mobile Application
        await page.getByRole('button', { name: 'Mobile Application'}).click()
        // Verify App icon design is in Done Column
        await expect(page.locator(testData.doneColumnSelector)).toContainText(text)
        // Confirm tags: "Design" 
            await expect(page.locator(taskSelector(text))).toHaveText(testData.designTag) 
        });


    



