const{test,expect}=require('@playwright/test');
const { only } = require('node:test');


test.describe.configure({mode:'serial'});
test('first test',async function({page})
{
    const monthNumber="6";
    const date="15";
    const year="2027";
    const expectedlist=[monthNumber,date,year];
    page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByRole('button',{name:'2027'}).click();
    await page.getByRole('button',{name:'June'}).click();
    await page.getByRole('button',{name:'15'}).click();
    const input=await page.locator(".react-date-picker__inputGroup__input");

    for (let i=0; i<expectedlist.length;i++){
        const grabdate=await input.nth(i).inputValue();
        expect(grabdate).toEqual(expectedlist[i]);
    }
    await page.pause();




});
