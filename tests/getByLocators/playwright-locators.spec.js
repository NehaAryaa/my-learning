import{test,expect} from '@playwright/test';

test('Playwright Special Locator' , async({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Student").check();
    await page.getByLabel("Gender").selectOption('Female');
    //await page.getByRole()
    await page.getByPlaceholder('Password').fill("Password123");
    await page.getByRole("button" , {name:'Submit'}).click();
    //await page.pause();
    const text = await page.getByText("Success! The Form has been submitted successfully!.").textContent();
    console.log(text);
    await page.getByRole('link', {name:"Shop"}).click();
// look for all the products and add one

   await page.locator('app-card').filter({hasText: "Nokia Edge"}).getByRole("button").click();
    await page.pause();


});