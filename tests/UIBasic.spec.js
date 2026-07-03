const{test,expect}=require('@playwright/test');
const { only } = require('node:test');

test('Browser context first',async function({browser})
{

const context=await browser.newContext();
const page=await context.newPage();
await page.goto("https://www.google.com/");
console.log(await page.title());
});

test('first test',async function({page})
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
const username= page.locator('#username');
const password=page.locator('#password');
const signin=page.locator('#signInBtn');
const cardtitles=page.locator('.card-body a');
const alltitles=cardtitles.allTextContents();
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await username.fill("aliraza34052@gmail.com");
await password.fill("Aliraza34052@");
await signin.click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
await username.fill("");
await username.fill("rahulshettyacademy");
await password.fill("");
await password.fill("Learning@830$3mK2");
await signin.click();
console.log (await cardtitles.nth(0).textContent());
console.log(await cardtitles.allTextContents());
});


test('UI test',async function({page})
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const username= page.locator('#username');
const password=page.locator('#password');
const signin=page.locator('#signInBtn');
await username.fill("rahulshettyacademy");
await password.fill("Learning@830$3mK2");
const dropdown=page.locator("select.form-control");
await dropdown.selectOption("02");
await page.locator(".radiotextsty").nth(1).click();
await page.locator("#okayBtn").click();
expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
await page.locator("#terms").click();
expect(page.locator("#terms")).toBeChecked();
await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");
await page.pause();
});

test('newpage test',async function({browser})
{
    const context=await browser.newContext();
    const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const [newPage]=await Promise.all(
[
context.waitForEvent('page'),
page.locator("[href*='documents-request']").click(),
])
const textgrab= await newPage.locator(".red").textContent();
const textsplit1=textgrab.split("@");
const textsplit2=textsplit1[1].split(" ");
const textsplit3=textsplit2[0];
//console.log(textgrab);
await page.locator('#username').fill(textsplit3);
await page.pause();
console.log(await page.locator('#username').inputValue());
});