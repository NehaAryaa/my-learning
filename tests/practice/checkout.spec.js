import{test,expect} from '@playwright/test';

test('add to cart',async({page})=>{
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
await page.pause();


});