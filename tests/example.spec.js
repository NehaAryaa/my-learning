import { test, expect } from '@playwright/test';

test('Click on Register button' , async({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator(".text-reset").click();
  await expect(page.locator(".login-wrapper h1")).toHaveText('Register');
  await page.locator('#firstName').fill('John');
  await page.locator('#lastName').fill('Doe');
  await page.locator("[type='email']").fill('john@gmail.com');
  await page.locator('#userMobile').fill('1234567890');
  await page.locator('#userPassword').fill('Password123');
  await page.locator('#confirmPassword').fill('Password123');
  await page.locator('input[type="checkbox"]').setChecked(true);  // Check
  await page.locator("[value='Register']").click();
  await expect(page.locator('#toast-container')).toContainText('User already exisits');
  await page.locator("[type='email']").fill("");
  await page.locator("[type='email']").fill('orkut54050@gmail.com');
 await page.locator("[value='Register']").click();
  await expect(page.locator('h1.headcolor')).toContainText('Account Created');
  
  //login
  await page.locator('.btn').click();
  await page.locator('#userEmail').fill('orkut54050@gmail.com');
  await page.locator('#userPassword').fill('Password123');
  await page.locator("[value='Login']").click();
  // print the page after login
  const heading = await page.locator('div.left.mt-1 > h3').textContent();
console.log(heading);


});



test('Find all the Products' , async({page}) => {
await page.goto('https://rahulshettyacademy.com/client');
await page.locator('#userEmail').fill('orkut54050@gmail.com');
await page.locator('#userPassword').fill('Password123');
await page.locator("[value='Login']").click();
//await page.waitForLoadState('networkidle');
// waitfor() works only for one element, if we have multiple elements then we can use allTextContents() to get the text of all the elements and store it in an array.
await page.locator('.card-body b').first().waitFor();
const titles = await page.locator('.card-body b').allTextContents();
console.log(titles);



});

test('Handling UI ' , async({page}) => {
  //gotto the page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  //enter USername
  await page.locator('#username').fill('rahulshettyacademy');
  //enter password
  await page.locator('#password').fill('Learning@830$3mK2');
  // click on the radio button
  await page.locator('.radiotextsty').last().click();
   // handle pop up
  await page.locator('#okayBtn').click();
  //assertion if the radio button is checked
 await expect(page.locator('.radiotextsty').last()).toBeChecked();
 // is checked() returns true or false
 console.log(await page.locator('.radiotextsty').last().isChecked());

 
 //select the drop down
 const dd = await page.locator('select.form-control');
 await dd.selectOption('Teacher');

 //click the checkbox
 await page.locator('#terms').click();
//asssetion
await expect(page.locator('#terms')).toBeChecked();

// click to UNCHECK the checkbox
await page.locator('#terms').uncheck();
//assertion
await expect(page.locator('#terms')).not.toBeChecked();
//console.log(expect(await page.locator('#terms').isChecked()).toBeFalsy());
// click on sign in button
await page.locator('#signInBtn').click();

// check for blinking text
await expect(page.locator("[href*='documents-request']")).toHaveAttribute('class', 'blinkingText'); 
await page.pause();

});

test.only('Handling Child Windows' , async({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentLink = page.locator("[href*='documents-request']");

  // Listen for the new page event
 const [newPage] = await Promise.all(
[
context.waitForEvent('page'),
  documentLink.click(),

]
  )

   const text = await newPage.locator('.red').textContent();
   const arrayText = text.split("@");
    let domainName = arrayText[1].split(" ");
   domainName = domainName[0];
  //console.log(domainName);

  //fill the email field with the extracted domain name
  await page.locator('#username').fill(domainName);
  // print the text of the email id
  console.log(await page.locator('#username').inputValue());




  







});