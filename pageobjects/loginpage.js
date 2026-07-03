class loginpage{

    constructor (page){
this.siginbutton=page.locator(".login-btn");
this.username=page.locator("#userEmail");
this.password=page.locator("#userPassword");
this.page=page;

    }
    async pagelanding(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }
async validlogin(username,password){

await this.username.fill(username);
await this.password.fill(password);
await this.siginbutton.click();
await this.page.waitForLoadState('networkidle');
}


}

module.exports={loginpage};