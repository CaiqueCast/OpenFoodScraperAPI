const joi = require("joi");

const schemaOrderByRank = joi.object({
  nutrition: joi.string().max(1).messages({
    "string.base": "A nutrition não deve conter numeros",
    "string.max": "A nutrition deve conter no maximo 1 caractere",
  }),
  nova: joi.number().integer().positive().messages({
    "number.base": "O campo nova  deve conter apenas numeros",
    "number.positive": "O campo nova não permite numeros negativo",
    "number.integer": "O campo nova não permite numeros com ponto flotuante",
  }),
});

module.exports = schemaOrderByRank;
