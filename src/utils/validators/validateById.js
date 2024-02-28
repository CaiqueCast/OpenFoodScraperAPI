const getPage = require("../../services/puppeteerConfig");
const schemaOrderById = require("../schemas/schemaValidatorsId");
const validateSchema = require("./validateSchema");

const validateId = async (schemaValues, url) => {
  const errorSchema = await validateSchema(schemaOrderById)(schemaValues);
  if (errorSchema) return errorSchema;

  const { browser, page } = await getPage();
  await page.goto(url);

  const elementError = await page.$(".if-empty-dnone");
  await browser.close();
  if (elementError) {
    return (messageErro = "Nenhum produto encontrado para o ID informado");
  }
};

module.exports = validateId;
