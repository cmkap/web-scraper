const puppeteer = require('puppeteer')
const express = require('express')
const Events = require('./scrapers/events');
const eventData = require('./data/events.json')

const PORT = 8080

const app = express()


app.get('/', (req, res) => {
  res.json('This is a webscrapper')
})

app.get('/results', (req, res) => {

  (async () => {
    let browser;
    let page;

    try {
          browser = await puppeteer.launch({
              headless: true
          });

          page = await browser.newPage();

          const events = await new Events(browser, page).main();
          
          await res.json(eventData)
        } catch (error) {
          console.log(error.stack || error);
        }

      await browser.close();
    })();
    
})



app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))