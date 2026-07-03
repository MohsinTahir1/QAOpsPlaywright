const{test,expect}=require('@playwright/test');
const { only } = require('node:test');


test('first test',async function({page})
{

    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill("aliraza134052@gmail.com");
    await page.getByPlaceholder("••••••").fill("Aliraza34052@");
    await page.locator("#login-btn").click();
    await page.locator('#nav-events').click();
    await page.locator("[href*='/admin/events']").first().click();
    await page.getByPlaceholder("Event title").fill("${Date.now()}");
    await page.getByPlaceholder("Describe the event…").fill("test data test date");
    const dropdown=await page.locator("#category");
    await dropdown.selectOption("Sports");
    await page.locator("#city").fill("mirpur");
    await page.locator("#venue").fill("nafees");
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2027-10-08T11:45');
    await page.locator("input[id='price-($)']").fill("10");
    await page.locator("input[id='total-seats']").fill("4");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText('Event created!')).toBeVisible();
    await page.locator('#nav-events').click();
    
    await page.pause();




});
