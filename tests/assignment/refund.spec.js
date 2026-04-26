import {test , expect} from '@playwright/test'

test('Register' , async({page}) => {
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByRole('link' ,  {name:"Register"}).click();
    await page.getByPlaceholder('you@email.com').fill("kiu@gmail.com");
    await page.locator('#register-password').fill("Password@123");
    await page.getByPlaceholder('Repeat your password').fill("Password@123");
    await page.getByRole('button' , {name:"Create Account"}).click();
    await expect(page.getByRole('link' , {name:"Browse Events →"})).toBeVisible();
});

async function loginAndGoToBooking(page, email ,password){
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder('you@email.com').fill("kiu@gmail.com");
    await page.locator('#password').fill("Password@123");
    await page.locator("[type='submit']").click();
    await expect(page.getByRole('link' , {name:"Browse Events →"})).toBeVisible();
};

test('Book an Event' , async({page}) => {
    await loginAndGoToBooking (page, "kiu@gmail.com", "Password@123");
    await page.locator('#nav-events').click();
    await expect(page.locator('#event-card').first()).toBeVisible();
    await page
    .locator('#event-card')
    .first()
    .getByTestId('book-now-btn')
    .click();

    await page.locator('#customerName').fill("Kian Kumar");
    await page.getByPlaceholder('you@email.com').fill("kiu@gmail.com");
    await page.getByPlaceholder('+91 98765 43210').fill("9897654567");
    await page.locator('#confirm-booking').click();

    // Navigate to booking detail

    await page.locator('#nav-bookings').click();
    const BASE_URL = "https://eventhub.rahulshettyacademy.com";
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByTestId('booking-card').first().getByRole('button', {name:"View Details"}).click();
    await expect(page.getByRole('heading' , {name:"Booking Information"})).toBeVisible();
    const bookingref = await page.locator('span.text-indigo-600').textContent();
    console.log(bookingref);

    const eventTitle = await page.getByRole('heading').first().textContent();
    console.log(eventTitle);

    await expect(bookingref.charAt[0]).toBe(eventTitle.charAt[0]);

    // Refund Eligibitilty
    await page.getByTestId("check-refund-btn").click();
    await expect(page.locator('#refund-result')).toBeVisible();
    const Resulttext = await page.locator('#refund-result').textContent();
    console.log("Eligibilty Result " +Resulttext);

    //Eligible for refund. Single-ticket bookings qualify for a full refund.
    await expect(page.locator('#refund-result')).toContainText("Eligible for refund");
    await expect(page.locator('#refund-result')).toContainText("Single-ticket bookings qualify for a full refund.");


    await page.pause();


});


test.only('Not Refundable' , async({page}) => {
    await loginAndGoToBooking (page, "kiu@gmail.com", "Password@123");
    await page.locator('#nav-events').click();
    await expect(page.locator('#event-card').first()).toBeVisible();
    await page.locator('#event-card').nth(1).getByTestId('book-now-btn')
    .click();
    await page.getByRole('button' , {name: "+"}).click();
    await page.getByRole('button' , {name: "+"}).click();


    await page.locator('#customerName').fill("Keshav Kumar");
    await page.getByPlaceholder('you@email.com').fill("kiu@gmail.com");
    await page.getByPlaceholder('+91 98765 43210').fill("9897654567");
    await page.locator('#confirm-booking').click();

    await page.locator('#nav-bookings').click();
    await page.getByTestId('booking-card').first().getByRole('button', {name:"View Details"}).click();
    await expect(page.getByRole('heading' , {name:"Booking Information"})).toBeVisible();
    const bookingref = await page.locator('span.text-indigo-600').textContent();
    console.log(bookingref);

    //refund eleigibilty
    await page.getByTestId("check-refund-btn").click();
    await expect(page.locator('#refund-result')).toBeVisible();
    const Resulttext = await page.locator('#refund-result').textContent();
    console.log("Eligibilty Result " +Resulttext);

    //Eligible for refund. Single-ticket bookings qualify for a full refund.
    await expect(page.locator('#refund-result')).toContainText("Not eligible for refund");
    await expect(page.locator('#refund-result')).toContainText("Group bookings (3 tickets) are non-refundable");











})
