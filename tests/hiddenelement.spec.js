const{test,expect}=require('@playwright/test');
const { only } = require('node:test');


test('first test',async function({page})
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com/");
    //await page.goBack();
    //await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog',dialog =>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator(".mouse-hover").hover();
    await page.locator("a[href*='#top']").click();
    const framepages=page.frameLocator("#courses-iframe");
    await framepages.getByRole('link', { name: 'NEW All Access plan' }).click();
    const textgrab=await framepages.locator(".text h2").textContent();
    const subscriber=textgrab.split(" ");
    const subscribernumber=subscriber[1];
    console.log(subscribernumber);


    await page.pause();




});
