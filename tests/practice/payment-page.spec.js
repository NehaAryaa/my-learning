import{test,expect} from '@playwright/test';

test('payment page',async({page})=>{
await page.goto('https://rahulshettyacademy.com/client');
//enter Email
await page.locator('#userEmail').fill("anu11@gmail.com");
//enter password
await page.locator('#userPassword').fill("Password123");
//click on login button
await page.locator('#login').click();
//assertion to check if the login is successful or not
await expect(page.locator("[href*='qasummit']")).toHaveAttribute('class', 'blinkingText');

// Add to cart IPHONE 13 PRO
const product = "iphone 13 pro";
await page.waitForLoadState('networkidle');
const productLocator = page.locator('.card-body');
const count = await productLocator.count();
for(let i =0;i<count;i++){
    if(await productLocator.nth(i).locator('b').textContent() === product){
        await productLocator.nth(i).locator("text= Add To Cart").click();
        break;
    }
}

// assertion to check if the product is added to the cart or not

await page.locator("[routerlink*='/dashboard/cart']").click();
const cartnName = await page.locator('.cartSection h3').textContent();
console.log("CartName =" +cartnName);

//to wait for the element to be visible - check for the tag where the product name is present and wait for that element to be visible and then if it is not 1 element then we can use the parent tag of the product name and wait for that element to be visible
await page.locator('div li').first().waitFor();

//verify the order name in the order history page or not
//await expect(page.locator('.cartSection h3')).toHaveText(product);
const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
expect(bool).toBeTruthy();

//CHEKCOUT
await page.locator("[type='button']").nth(1).click();


//Fill all the details in the checkout page and place the order
await page.locator('input.text-validated').nth(0).fill("4543 9931 9292 2293");
const date = await page.locator('.ddl').nth(0);
await date.selectOption("06");
const year = await page.locator('.ddl').nth(1);
await year.selectOption("30");
// for cvv
await page.locator('div input').nth(1).fill("123");
await page.locator('div input').nth(2).fill("neha");
const coupon = await page.locator('div input').nth(3).fill("rahulshettyacademy");
await page.locator("[type='submit']").click();

//verify the email Address in the order history page or not

const email = await page.locator(".user__name [type='text']").nth(0).textContent();
console.log("Email 1=" +email);
const email2 = await page.locator(".user__name [type='text']").nth(1).inputValue();
console.log("Email 2=" +email2);
expect(email).toBe(email2);
await page.pause();



//Select the country from the drop down
 await page.locator("[placeholder='Select Country']").pressSequentially("aus", { delay: 50 });

const dropdown = await page.locator('.ta-results');
 await dropdown.first().waitFor();
 const optionCount= await dropdown.locator("button").count();
 console.log("Option count = " +optionCount);

 for(let i =0;i<optionCount;i++){

    if(await dropdown.locator("button").nth(i).textContent() === " Australia"){
        await dropdown.locator("button").nth(i).click();
        break;
    }
 }
 await page.locator("text=Place Order ").click();

// Assertion to check the order is placed or not
await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');



await page.pause();





});