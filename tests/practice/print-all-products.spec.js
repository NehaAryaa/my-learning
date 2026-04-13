import{test, expect} from '@playwright/test';

test('Print All Products', async({page}) =>{
await page.goto('https://rahulshettyacademy.com/client');
//enter Email
await page.locator('#userEmail').fill("anu11@gmail.com");
//enter password
await page.locator('#userPassword').fill("Password123");
//click on login button
await page.locator('#login').click();
//assertion to check if the login is successful or not
await expect(page.locator("[href*='qasummit']")).toHaveAttribute('class', 'blinkingText');

//Read all the products and print the name of the products
await page.waitForLoadState('networkidle');
const title = await page.locator('.card-body b , .card-body .text-muted').allTextContents();
console.log(title);
const count = await page.locator('.card-body').count();
console.log("Count of the products " +count);
});