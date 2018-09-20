const puppeteer = require('puppeteer');

const scrape = async (siteMap = '') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(siteMap);
  await page.waitFor(1000);
  const urls = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('loc'));
    return nodes.map(({ innerHTML }) => innerHTML);
  });
  await browser.close();
  return urls;
};

module.exports = scrape;
