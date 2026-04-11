import { test, expect } from '@playwright/test';

test('Register' , async({page}) => {
  await page.goto('https://rahulshettyacademy.com/client');
  // click on Register
  await page.locator('.text-reset').click();
  ///firstName
  await page.locator('#firstName').fill("Sam");
  //LastName
  await page.locator('#lastName').fill("Paul");
  //Email
  await page.locator("[type='email']").fill("anu111@gmail.com");
  //Phone Number
  await page.locator('#userMobile').fill("1234567890");
  //Occupation drop down
  const dd = await page.locator('.custom-select');
  dd.selectOption('Engineer');
  //Select Radio Button
  await page.locator("[type='radio']").first().click();
  //Assertion to Check the Radio button
  await expect(page.locator("[type='radio']").first()).toBeChecked();
  // Password
  await page.locator('#userPassword').fill("Password123");
  //Confirm Password
  await page.locator('#confirmPassword').fill("Password123");
   //Check the checkbox
   await page.locator("[type='checkbox']").click();
   // Assertion to check the Check box is clicked or Not
   await expect(page.locator("[type='checkbox']")).toBeChecked();
   // Click on Register Button
   await page.locator("[value='Register']").click();
   // Assertion to check the Toast message
   const ToastMsg = page.locator('.headcolor');
   await expect(ToastMsg).toContainText("Account Created Successfully");


  await page.pause();



});

test('Login' , async({page}) => {

await page.goto('https://rahulshettyacademy.com/client');
//enter EMail
await page.locator('#userEmail').fill("anu111@gmail.com");

//enter Password
await page.locator('#userPassword').fill("Password123");
// Click on Login Button
await page.locator('#login').click();

// Assertion to cehk if thelogin is succesfsull or not
await expect(page.locator("[href='http://qasummit.org/']")).toHaveAttribute('class','blinkingText');


});

test('Add to Cart' , async({page}) => {

await page.goto('https://rahulshettyacademy.com/client');
//enter EMail
await page.locator('#userEmail').fill("anu111@gmail.com");

//enter Password
await page.locator('#userPassword').fill("Password123");
// Click on Login Button
await page.locator('#login').click();
await page.waitForLoadState('networkidle');
// Assertion to cehk if thelogin is succesfsull or not
await expect(page.locator("[href='http://qasummit.org/']")).toHaveAttribute('class','blinkingText');

// List all the products in the page with all the deatisl of the product which is parent locator of the product title
const products = page.locator('.card-body');
const productname = "ZARA COAT 3";

// read all the products
const titles = await page.locator('.card-body b').allTextContents();
console.log(titles);

// Count on the products
const count = await products.count();
console.log(count);

// for(let i =0; i<count;i++){
//    products.nth(i)
// }


});