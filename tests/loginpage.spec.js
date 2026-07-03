import { test, expect } from '@playwright/test';
import { only } from 'node:test';
import { loginpage } from '../pageobjects/loginpage';
import { dashboardpage } from '../pageobjects/dashboardpage';
//JSON->STRING=> js object
const dataset=JSON.parse(JSON.stringify(require("../utils/placeordertestdata.json")));

for (const data of dataset)
{
test('mohsin',async function({page})
{
    //const username="mohsintahir34052@gmail.com";
    //const password="Mohsin34052@";
    const products=page.locator(".card-body");
    //const productname="ZARA COAT 3";
    const Loginpage=new loginpage(page);
    const Dashboardpage=new dashboardpage(page);
await Loginpage.pagelanding();
await Loginpage.validlogin(data.username,data.password);
await Dashboardpage.productfind(data.productname);

await page.locator("div li").first().waitFor();
await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
await expect(page.locator('h3:has-text("ZARA COAT 3")')).toContainText("ZARA COAT 3");
await page.locator("text=Checkout").click();
await page.locator(".field").first().waitFor();
const expiryMonth = page.locator('div.field.small:has(div.title:has-text("Expiry Date")) select').first();
await expiryMonth.selectOption('05');
const expiryYear = page.locator('div.field.small:has(div.title:has-text("Expiry Date")) select').nth(1);
await expiryYear.selectOption('24');
await page.locator('div.field:has(div.title:has-text("Credit Card Number")) input').fill("");
await page.locator('div.field:has(div.title:has-text("Credit Card Number")) input').fill("1234 5678 1231 1235");
await page.locator('div.field.small:has(div.title:has-text("CVV Code")) input').fill("555");
await page.locator('div.field:has(div.title:has-text("Name on Card")) input').fill('Mohsin');
await page.locator("[name='coupon']").fill("abc");
await page.locator("[placeholder='Select Country']").pressSequentially("ind");
const dropdown1=page.locator(".ta-results");
await dropdown1.waitFor();
const dynamic=page.locator(".ta-results button");
const optionscounts=await dynamic.count();
for(let i=0; i<optionscounts;i++)
{
    const text=await dynamic.nth(i).textContent();
    if(await text===" India"){
        await dynamic.nth(i).click();
        break;
    }
}
const grabemail=await page.locator(".user__name [type='text']").first().textContent();
console.log(grabemail);
expect( await page.locator(".user__name [type='text']").first()).toHaveText("mohsintahir34052@gmail.com");
await page.locator(".action__submit").click();
await page.locator(".box").first().waitFor();
expect(await page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
const graborderid=await page.locator(".em-spacer-1 [class='ng-star-inserted']").textContent();
console.log(graborderid);
await page.locator("button[routerlink*='myorders']").click();
await page.locator(".table").waitFor();
const rows=await page.locator("tbody tr");
for (let y=0;y<await rows.count();y++)
{

    const roworderid=await rows.nth(y).locator("th").textContent();
    if (graborderid.includes(roworderid))
    {
        await rows.nth(y).locator("button").first().click();
        break;
    }
}
const grabordertextfromview=await page.locator(".col-text").textContent();
expect(graborderid.includes(grabordertextfromview)).toBeTruthy();
await page.pause();
});
}

