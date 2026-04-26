import{test,expect} from '@playwright/test';

test('Calendar Validation' , async({page}) => {
    const monthNumber = "6";
    const date = "15";
    const year = "2027";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    // for month
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();









});


test('calendar to find Date fro hidden element' , async({page}) => {

await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
const month = await page.locator('.react-date-picker__inputGroup__month').getAttribute('value');
const day =  await page.locator('.react-date-picker__inputGroup__day').getAttribute('value');
const year = await page.locator('.react-date-picker__inputGroup__year').getAttribute('value');
//console.log(await page.locator('.react-date-picker__inputGroup input[name="date"]').inputValue());

    console.log(await page.locator("[name='date']").inputValue());
//console.log(`Date = ${day}/${month}/${year}`);



});

test('Calendar practice ' , async({page}) =>{

    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber , date , year];

await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
await page.locator('.react-date-picker__inputGroup').click(); ///date edit box
await page.locator('.react-calendar__navigation__label').click(); //month 
await page.locator('.react-calendar__navigation__label').click();//year
await page.getByText(year).click();
await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click();
await page.locator("//abbr[text()='"+date+"']").click();
// assertion for calender
const inputs =  page.locator('.react-date-picker__inputGroup__input');

for(let i=0; i<expectedList.length;i++){

    const value = await inputs.nth(i).inputValue();
    expect(value).toEqual(expectedList[i]);
}
});