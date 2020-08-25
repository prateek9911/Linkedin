require("chromedriver");
let swd = require("selenium-webdriver");
const { Driver } = require("selenium-webdriver/chrome");
let browser = new swd.Builder();
let { email, password } = require("./credentials.json");
// tab=> tab
let tab = browser.forBrowser("chrome").build();

let tabWillBeOpenedPromise = tab.get("https://www.linkedin.com/login");
tabWillBeOpenedPromise
    .then(function () {
        // implicit timeout 
        let findTimeOutP = tab.manage().setTimeouts({
            implicit: 10000
        });
        return findTimeOutP;
    })
    .then(function () {
        //homePage Opened
        //to find the username and password
        let UserBoxPromise = tab.findElement(swd.By.css("#username"));
        let passwordBoxPromise = tab.findElement(swd.By.css("#password"));
        return Promise.all([UserBoxPromise, passwordBoxPromise]);
    })
    .then(function (credArr) {
        //enter the email id
        let userBox = credArr[0];
        let passwordBox = credArr[1];
        let usernameWillBeFilled = userBox.sendKeys(email);
        let passwordWillBeFilled = passwordBox.sendKeys(password);
        return Promise.all([usernameWillBeFilled, passwordWillBeFilled]); 
    })
    .then(function () {
        let loginSelect = tab.findElement(swd.By.css(".login__form_action_container"));
        return loginSelect;
    })
    .then(function (loginSelect) {
        let loginClick = loginSelect.click();
        return loginClick;
    })
    .then(function () {
        let findNetworkButton = tab.findElement(swd.By.css("a[data-test-global-nav-link='mynetwork']"));
        return findNetworkButton;
    })
    .then(function(findNetworkButton) {
        let clickNetworkButton = findNetworkButton.click();
        return clickNetworkButton;
    })
    .then(async function () {
        //let manageTabs = await tab.findElements(swd.By.css(".administration ul li a"));
        let findConnectionsBtn = await tab.findElement(swd.By.css("a[data-control-name='connections']"));
        //let findConnectionsBtn = tab.findElement(swd.By.css("a[data-control-name='connections']"));
        return findConnectionsBtn;
    })
    .then(function (findConnectionsBtn) {
        let clickConections = findConnectionsBtn.click();
        return clickConections;
    })
    .then(function () {
        //let ele = await driver.wait(until.elementLocated(swd.By.css('p')),10000);
        let ulList = tab.findElements(swd.By.css("ul"));
        let ulElement = tab.findElement(swd.By.xpath("//*[@id='ember543']/ul"));
        console.log(ulList);
        console.log("ULELEMNT found -- ")
        console.log(ulElement);
        
    })