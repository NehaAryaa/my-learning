import{test,expect} from '@playwright/test';



test('Login', async({page}) =>{

await page.goto('https://rahulshettyacademy.com/client');
//enter Email
await page.locator('#userEmail').fill("anu11@gmail.com");
//enter password
await page.locator('#userPassword').fill("Password123");
//click on login button
await page.locator('#login').click();
//assertion to check if the login is successful or not
await expect(page.locator("[href*='qasummit']")).toHaveAttribute('class', 'blinkingText');

});