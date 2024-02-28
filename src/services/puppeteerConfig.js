const puppeteer = require("puppeteer");

const getPage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  return { browser, page };
};

module.exports = getPage;
