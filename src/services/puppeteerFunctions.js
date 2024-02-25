const puppeteer = require("puppeteer");

const scrapeDataByRank = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    const links = await page.$$eval(".list_product_a", (el) =>
      el.map((link) => link.href)
    );

    let response = [];

    for (link of links) {
      await page.goto(link);

      await page.waitForSelector('a[href="#panel_nova"] .attr_text span');

      const title = await page.$eval(
        ".title-1",
        (element) => element.innerText
      );
      const id = await page.$eval(
        'span[property="food:code"][itemprop="gtin13"]',
        (element) => element.innerText
      );
      const nutritionScore = await page.$eval(
        'a[href="#panel_nutriscore"] .attr_text h4',
        (element) => {
          return element.textContent.replace("Nutri-Score ", "");
        }
      );
      const nutritionTitle = await page.$eval(
        'a[href="#panel_nutriscore"] .attr_text span',
        (element) => element.innerText
      );
      const novaScore = await page.$eval(
        'a[href="#panel_nova"] .attr_text h4',
        (element) => {
          return element.textContent.replace("NOVA ", "");
        }
      );
      const novaTitle = await page.$eval(
        'a[href="#panel_nova"] .attr_text span',
        (element) => element.innerText
      );

      const object = {
        id,
        name: title,
        nutrition: {
          score: nutritionScore,
          title: nutritionTitle,
        },
        nova: {
          score: novaScore,
          title: novaTitle,
        },
      };

      response.push(object);
    }

    await browser.close();
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = scrapeDataByRank;
