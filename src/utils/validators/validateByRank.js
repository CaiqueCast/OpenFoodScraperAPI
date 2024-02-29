const schemaOrderByRank = require("../schemas/schemaValidatorsRank");
const validateSchema = require("./validateSchema");

const validateRank = async (schemaValues) => {
  const errorSchema = await validateSchema(schemaOrderByRank)(schemaValues);
  if (errorSchema) return errorSchema;

  if (schemaValues.nutrition === undefined && schemaValues.nova === undefined) {
    return "É necessario informar a 'nutrition' ou o grupo 'nova'.";
  }
};

module.exports = validateRank;
