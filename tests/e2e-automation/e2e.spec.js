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


test.only('Add to Cart' , async({page}) => {

await page.goto('https://rahulshettyacademy.com/client');
//enter EMail
await page.locator('#userEmail').fill("anu111@gmail.com");
//enter Password
await page.locator('#userPassword').fill("Password123");
// Click on Login Button
await page.locator('#login').click();
await page.waitForLoadState('networkidle');
// waitfor() works only for one element, if we have multiple elements then we can use allTextContents() to get the text of all the elements and store it in an array.
await page.locator('.card-body b').first().waitFor(); 
// Assertion to cehk if the login is succesfull or not
await expect(page.locator("[href='http://qasummit.org/']")).toHaveAttribute('class','blinkingText');

// List all the products in the page with all the details of the product which is parent locator of the product title
const products = page.locator('.card-body');
const productname = "ZARA COAT 3";

// read all the products
const titles = await page.locator('.card-body b').allTextContents();
console.log(titles);

// Count on the products
const count = await products.count();
console.log(count);

// Loop through the products and click on the Add to Cart button of the product which is ZARA COAT 3

for(let i=0;i<count;i++){
  if(await products.nth(i).locator('b').textContent() === productname){
    //add to cart
    //await products.nth(i).locator('text = " Add To Cart"').click();
    await products.nth(i).getByText(' Add To Cart').click();
    break;
  
  }
  
}

// Verify whether the product is added to the cart or not
await page.locator("[routerlink*='cart']").click();
// Assertion to check the product is added to the cart or not
//const bool =await page.locator('.cartSection h3').isVisible();

// Putting a wait for the element to be visible before checking the assertion as isVsiible() doesnt has Async wait and it will check the assertion before the element is visible and it will fail the test. so we have to put a wait for the element to be visible before checking the assertion.
await page.locator('div li').first().waitFor();

//Another way to check the product is added to the cart or not. through text of the product in the cart
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();


// Count the no of products in the cart and their names

await page.locator('.cartSection').first().waitFor();
const CardProd =  page.locator('.cartSection h3');
const cartTitle = await page.locator('.cartSection h3').allTextContents();
console.log(cartTitle);
const countCart = await CardProd.count();
console.log(countCart);

// Click on the Checkout Button
//await page.locator("[type='button']").click();
await page.locator("text=Checkout").click(); /// text selector

//Select the country from the drop down
await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });

const dropdown = await page.locator('.ta-results');
await dropdown.first().waitFor();
const optionCount= await dropdown.locator("button").count();

for(let i=0;i<optionCount;i++){
  if(await dropdown.locator("button").nth(i).textContent() === " India"){
    await dropdown.locator("button").nth(i).click();
    break;
  }}


  //Verify the email id present in the checkout page is correct or not
  await expect(page.locator(".user__name [type='text']").first()).toHaveText('anu111@gmail.com');

  //Click on the Place Order Button
  await page.locator("text=Place Order ").click();

  // Assertion to check the order is placed or not

await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

// Print the order ID

const labels = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
console.log(labels);


// verify the order ID is present in the order history page or not
await page.locator('')
  await page.pause();
  
}
  
);




test('Add Two Products to Cart', async({page}) => {


  await page.goto('https://rahulshettyacademy.com/client');
//enter EMail
await page.locator('#userEmail').fill("anu111@gmail.com");
//enter Password
await page.locator('#userPassword').fill("Password123");
// Click on Login Button
await page.locator('#login').click();
//await page.waitForLoadState('networkidle');
// waitfor() works only for one element, if we have multiple elements then we can use allTextContents() to get the text of all the elements and store it in an array.
await page.locator('.card-body').first().waitFor();


// List all the products in the page with all the details of the product which is parent locator of the product title
const products = page.locator('.card-body');

// read all the products
const titles = await page.locator('.card-body b').allTextContents();
console.log(titles);

// Count on the products
const count = await products.count();
console.log(count);

const productsToAdd = ['IPHONE 13 PRO', 'ADIDAS ORIGINAL'];

for(let j=0;j < productsToAdd.length; j++){
  for (let i = 0; i < count; i++) {
  const title = await products.nth(i).locator('b').textContent();
  if (title.trim() === productsToAdd[j]) {
      await products.nth(i).getByText(' Add To Cart').click();
      break; // Breaks the inner loop to move to the next product name
    }
  }
}


  // Count the no of products in the cart and their names


const CardProd =  page.locator('.cartSection h3');
const cartTitle = await page.locator('.cartSection h3').allTextContents();
console.log(cartTitle);
const countCart = await CardProd.count();
console.log(countCart);

await page.pause();


})