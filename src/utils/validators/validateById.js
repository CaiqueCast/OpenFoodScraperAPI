const schemaOrderById = require("../schemas/schemaValidatorsId");
const validateSchema = require("./validateSchema");
const puppeteer = require("puppeteer");

const validateId = async (schemaValues, url) => {
  const errorSchema = await validateSchema(schemaOrderById)(schemaValues);
  if (errorSchema) return errorSchema;

  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // await page.goto(url);

  // const elementError = await page.$(".if-empty-dnone");
  // await browser.close();
  // if (elementError) {
  //   return (messageErro = "Nenhum produto encontrado para o ID informado");
  // }
};

module.exports = validateId;
