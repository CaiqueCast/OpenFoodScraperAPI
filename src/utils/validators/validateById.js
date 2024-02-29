const schemaOrderById = require("../schemas/schemaValidatorsId");
const validateSchema = require("./validateSchema");

const validateId = async (schemaValues) => {
  const errorSchema = await validateSchema(schemaOrderById)(schemaValues);
  if (errorSchema) return errorSchema;
};

module.exports = validateId;
