const puppeteer = require('puppeteer');
const scrape = require('./scrape');

scrape('https://www.cheronimo.com/sitemap.xml').then(async (urls) => {
  const browser = await puppeteer.launch();

  const cleanSlashes = (str = '') => str.replace(/\//g, (match, offset, str) => (offset > 0 ? '-' : ''));
  const cleanDotHTML = (str = '') => str.replace(/.html/, '');

  for (let i = 0; i < urls.length; i += 1) {
    const url = urls[i];
    const parsedUrl = new URL(url);
    const fileName = cleanDotHTML(cleanSlashes(parsedUrl.pathname.slice(1)));

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: `./screen-shots/${fileName}.png`, fullPage: true });

    console.log(`page ${fileName} has been screnshot and saved`);

    await page.close();
  }
  await browser.close();

  console.log(urls.length);
});
