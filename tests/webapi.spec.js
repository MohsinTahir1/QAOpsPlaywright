const{test,expect,request}=require('@playwright/test');
const { validateHeaderValue } = require('http');
const { only } = require('node:test');
const loginpayload={userEmail: "mohsintahir34052@gmail.com", userPassword: "Mohsin34052@"};
let token;

test.beforeAll(async()=>{
const APIcontext=await request.newContext();
const loginresponse=await APIcontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
{
    data:loginpayload

})
expect(loginresponse.ok()).toBeTruthy();
const loginresponsejson=await loginresponse.json();
token=loginresponsejson.token;
console.log(token);
});

test.beforeEach(()=>{

});

test('first test',async function({page})
{
    page.addInitScript(value =>
        {
window.localStorage.setItem('token',value);
    }, token);
    const products=page.locator(".card-body");
    const productname="ZARA COAT 3";
await page.goto("https://rahulshettyacademy.com/client/");
//await page.locator("#userEmail").fill("mohsintahir34052@gmail.com");
//await page.locator("#userPassword").fill("Mohsin34052@");
//await page.locator(".login-btn").click();
await page.waitForLoadState('networkidle');
const tiltes=await page.locator(".card-body b").allTextContents();
console.log(tiltes);
const count=await products.count();
for (let i=0;i<count;i++)
{
    if (await products.nth(i).locator("b").textContent()==productname)
    {
        await  products.nth(i).locator(".fa-shopping-cart").click();
    }
}
await page.locator(".btn-custom").nth(2).click();
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
