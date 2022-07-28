const puppeteer = require('puppeteer')
const Events = require('./scrapers/events'); 


(async () => {
    let browser;
    let page;

    try {
        browser = await puppeteer.launch({
            headless: true
        });

        page = await browser.newPage();

        const events = await new Events(browser, page).main();

    } catch (error) {
        console.log(error.stack || error);
    }

    await browser.close();
})();

