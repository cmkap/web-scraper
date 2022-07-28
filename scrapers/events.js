const writeFileSync = require("fs").writeFileSync;

class Events {
    constructor(browser, page) {
        this.browser = browser;
        this.page = page;

        this.events = [];
        this.url = 'https://sports.bwin.com/en/sports/horse-racing-29/fixtures/cheltenham-gold-cup-chase-2023-2:3119903'
    }

    async main() {
        await this.page.goto(this.url, { waitUntil: "domcontentloaded"});
        await this.page.waitFor(10000);

        
        console.log(this.page)

        this.events =  await this.page.evaluate(() => 
        
            Array.from(document.querySelectorAll('#main-view > ms-antepost-fixture > section > ms-antepost-market > section > div > ms-antepost-participants > ms-fixture-pick > div')).map(rider => {
                return {
                            name: rider.querySelector('#main-view > ms-antepost-fixture > section > ms-antepost-market > section > div > ms-antepost-participants > ms-fixture-pick > div > span.fixture-label.fixture-pick-title').innerHTML,
                            odds:rider.querySelector('span').innerHTML
                       }
                
            })
        );
        
        this.writeToJson();
        return this.events
    }
    
    writeToJson() {
        writeFileSync("./data/events.json", JSON.stringify(this.events));
    }
}

module.exports = Events;
