const getPage = require("../../services/puppeteerConfig");
const schemaOrderByRank = require("../schemas/schemaValidatorsRank");
const validateSchema = require("./validateSchema");

const validateRank = async (schemaValues, url) => {
  const errorSchema = await validateSchema(schemaOrderByRank)(schemaValues);
  if (errorSchema) return errorSchema;

  if (schemaValues.nutrition === undefined && schemaValues.nova === undefined) {
    return "É necessario informar a 'nutrition' ou o grupo 'nova'.";
  }

  const { browser, page } = await getPage();
  await page.goto(url);

  const elementError = await page.$(".if-empty-dnone");
  await browser.close();
  if (elementError) {
    return (messageErro =
      "Nenhum produto encontrado para as preferencias informadas");
  }
};

module.exports = validateRank;
