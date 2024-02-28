const joi = require("joi");

const schemaOrderById = joi.object({
  id: joi.number().integer().positive().required().messages({
    "any.required": "O campo id é obrigatório",
    "number.base": "O campo id  deve conter apenas numeros",
    "number.positive": "O campo id não permite numeros negativo",
    "number.integer": "O campo id não permite numeros com ponto flotuante",
  }),
});

module.exports = schemaOrderById;
