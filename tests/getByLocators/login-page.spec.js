import{test,expect} from '@playwright/test';

test('Playwright Special Locator' , async({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("anu11@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Password123");
    await page.getByRole('button' , {name:'Login'}).click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body').first().waitFor();
    //print all the prod
    const allProductsName = await page.locator('.card-body b').allTextContents();
    console.log(allProductsName);

    //Add to Cart using FILTER

    await page.locator('.card-body').filter({hasText: "ZARA COAT 3"}).getByRole("button" , {name:'  Add To Cart'}).click();

    //click on cart
    await page.getByRole("listitem").getByRole("button" , {name: '  Cart '}).click();

    // wait for all the products load
    await page.locator('div li').first().waitFor();
    
    //Assert if zara coat 3 is visible
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button" , {name: 'Checkout'}).click();

    //select country

    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.locator('.ta-results ').filter({hasText: "India"}).click();
    //await page.getByRole("button" , {name: ' India'}).nth(1).click();

    // Place order

    await page.getByText("Place Order ").click()

// COnfirmation order

await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();


    await page.pause();





});
