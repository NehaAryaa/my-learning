import{test, expect } from '@playwright/test'



test('Register' , async({page}) => {
await page.goto('https://eventhub.rahulshettyacademy.com');
await page.getByRole('link', {name:"Register"}).click();
//enter fullname
await page.getByPlaceholder('you@email.com').fill("mini@gmail.com");
await page.getByTestId('register-password').fill("Password@123");
await page.getByRole('textbox',{name:"Repeat your password"}).fill("Password@123");
await page.getByTestId('register-btn').click();

});


async function login(page, email, password) {
await page.goto('https://eventhub.rahulshettyacademy.com/login');
await page.getByPlaceholder('you@email.com').fill('mini@gmail.com');
await page.getByLabel('password').fill('Password@123');
await page.locator('#login-btn').click();
const visibile = await page.getByRole('link' , {name :"Browse Events →"}).isVisible();
console.log(visibile);


}

test('Create a New Event' , async({page}) => {
    await login(page, 'mini@gmail.com' , 'Password@123');
    await page.getByRole('link' , {name :"Browse Events →"}).click();
    await page.getByRole('button' , {name:"Add New Event"}).click();
    //Title
    await page.locator('#event-title-input').fill("Automation2 Testing Event");
    await page.getByPlaceholder('Describe the event…').fill("Hands-on workshop covering Playwright, Selenium, and API testing. Learn real-world automation strategies, debugging techniques, and best practices for building scalable test frameworks.");
    const dd = await page.locator('#category').selectOption("Workshop");
    await page.getByLabel('City').fill("Bangalore");
    await page.getByLabel('Venue').fill("infy MNC3");
    await page.getByLabel('Event Date & Time').fill('2026-05-31T17:19');
    await page.getByLabel('Price ($)').fill("100");
    const seats = await page.getByLabel('Total Seats').fill("50");
    console.log(seats);
    const value = await page.getByLabel('Total Seats').inputValue();
    console.log(value);
    await page.locator('#add-event-btn').click();
    const toastMsg = await page.getByText("✓Event created!").isVisible();
    console.log(toastMsg);
    
});



test('Find the Event Card ', async({page}) => {
await page.goto('https://eventhub.rahulshettyacademy.com');
const url =   "https://eventhub.rahulshettyacademy.com";
await login(page, 'mini@gmail.com' , 'Password@123');
await page.getByTestId('nav-events').click();
const EventCardslocator = page.getByTestId('event-card');
await page.getByTestId('event-card').first().waitFor();
const count = await page.getByTestId('event-card').count();
console.log("count " +count);

await expect(page.getByTestId('event-card').filter({hasText:"Automation2 Testing Event"})).toBeVisible();
const seatContent = await page.getByTestId('event-card').filter({hasText:"Automation2 Testing Event"}).locator('.text-emerald-600').textContent();
console.log(seatContent);
const seats = parseInt(seatContent.split(" ")[0]);
console.log(seats);

//converting that to Number
const seatsBeforeBooking = seats;
console.log("seatsBeforeBooking " +seatsBeforeBooking);
 
// Clcik the Book Now Button

await page.getByTestId('event-card').filter({hasText:"Automation2 Testing Event"}).getByTestId('book-now-btn').click();
// assert
await expect(page.locator('.ticket-count')).toHaveText("1");

//Fill the form
await page.getByLabel('Full Name').fill("Swaggy");
await page.locator('#customer-email').fill('mini@gmail.com');
await page.getByPlaceholder('+91 98765 43210').fill('+91-9090876534');
await page.locator('.confirm-booking-btn').click();
//assert
await expect(page.getByRole('heading' , {name : "Booking Confirmed! 🎉"})).toBeVisible();;

// Navigate to My booking
await page.getByTestId('nav-bookings').click();
const bookRefLocator =  page.locator('.booking-ref ').first();
await expect(bookRefLocator).toBeVisible();
const bookingRef = await bookRefLocator.textContent();
console.log(bookingRef);


// Step 7 verify in MyBooking

await page.getByTestId("nav-bookings").click();
await expect(page).toHaveURL(`${url}/bookings`);
await expect(page.locator('#booking-card').filter({hasText:bookingRef})).toBeVisible();

await expect(page.locator('#booking-card').filter({hasText:bookingRef})).toContainText("Automation2 Testing Event");

// await expect(page.locator('#booking-card').filter({has:page.locator('h3', {
//     hasText:"Automation2 Testing Event"
//})})).toBeVisible();

//Step 8 Verify seat reduction
await page.getByTestId('nav-events').click();
//
const cardLocator = page.locator('#event-card');
await expect(cardLocator.first()).toBeVisible();
await expect (cardLocator.filter({hasText:"Automation2 Testing Event"})).toContainText("Automation2 Testing Event");
await expect (cardLocator.filter({hasText:"Automation2 Testing Event"})).toBeVisible();
    const seatsAfterBooking = parseInt(
    (await cardLocator.filter({hasText: "Automation2 Testing Event"}).locator('.text-emerald-600').textContent()).split(" ")[0],10);
console.log("Seat after booking " +seatsAfterBooking);
 expect(seatsAfterBooking).toBe(seatsBeforeBooking-1);



//Test 2 — Group ticket booking is NOT eligible for refund



await page.pause();
});

