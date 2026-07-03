const{test,expect}=require('@playwright/test');
const { only } = require('node:test');
let fakerequest={data:[],message:"No Orders"};

let WebContext;
test.beforeAll(async({browser}) =>
{
    const context= await browser.newContext();  // invoke browser
    const page=await context.newPage(); // invoke page
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("mohsintahir34052@gmail.com");
    await page.locator("#userPassword").fill("Mohsin34052@");
    await page.locator(".login-btn").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});  // make a file in which we store all cookies, session storage
   WebContext= await browser.newContext({storageState: 'state.json'}); // pass all stored data to invoke browser with store data
})

test('first test',async function()
{
    const page= await WebContext.newPage();  /// to invoke broswer with the new page 
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69fc88ece83610b531cf73bd",
    async route =>
    {
const response=await page.request.fetch(route.request());
let body=JSON.stringify(fakerequest);
route.fulfill(
    {
        response,
        body,
    }
)
    }
)
await page.locator("[routerlink*='myorders']").click();
await page.pause();
await page.goto("https://rahulshettyacademy.com/client/#/dashboard/order-details/6a0c523417ee3e78ba881f555b7");
await page.locator(".blink_me").screenshot({path:'screenshot1.png'});
expect(await page.screenshot()).toMatchSnapshot("screenshot.png");
//await page.screenshot({path:'screenshot.png'});

});




