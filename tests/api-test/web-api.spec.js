import{test, expect, request} from '@playwright/test'
import {APIUtils} from '../utils/APIUtils';
const loginPayload = {userEmail: "mininehakumari@gmail.com", userPassword: "Yd.rJsycESF4KR"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};


let response;

test.beforeAll( async() => {
    const apiRequest = await request.newContext();
    const apiUtils = new APIUtils(apiRequest,loginPayload);
    response =await apiUtils.createOrder(orderPayload);
});


// Verify if the product is added to the cart or not through API and then verify it through UIs
test('Place an Order' , async({page}) => {
      page.addInitScript(value => {
        window.localStorage.setItem("token", value);} , response.token);

await page.goto('https://rahulshettyacademy.com/client');
await page.locator("[routerlink='/dashboard/myorders']").click();
await page.locator('tbody').first().waitFor();
const rows =  page.locator('tbody tr');

for(let i=0;i<await rows.count();i++){
    const rowsOrder = await rows.nth(i).locator('th').textContent()
        if(response.orderId.includes(rowsOrder)){
            await rows.nth(i).locator("button").first().click();
            break;


        }
        
    }


    const orderDetails = await page.locator('.col-md-6 .col-text').textContent();
    await page.pause();
    expect(response.orderId.includes(orderDetails)).toBeTruthy();
  
}
  
);

