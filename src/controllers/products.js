const {
  scrapeDataByRank,
  scrapeDataById,
} = require("../services/puppeteerFunctions");
const validateId = require("../utils/validators/validateById");
const errorRes = require("../utils/responses/errorResponse");
const successRes = require("../utils/responses/successResponse");
const validateRank = require("../utils/validators/validateByRank");

const getProductByRank = async (req, res) => {
  try {
    const nutrition = req.query.nutrition;
    const nova = req.query.nova;

    let url = `https://br.openfoodfacts.org/`;
    if (!nova) {
      url += `/nutrition-grade/${nutrition}/`;
    } else if (!nutrition) {
      url += `nova-group/${nova}/`;
    } else {
      url += `/nutrition-grade/${nutrition}/nova-group/${nova}/`;
    }

    Number(nova);
    const validQuery = await validateRank({ nutrition, nova }, url);
    if (validQuery) {
      return errorRes.errorResponse400(res, validQuery);
    }

    const response = await scrapeDataByRank(res, url);

    return successRes.successResponse200(res, response);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let url = `https://br.openfoodfacts.org/produto/${id}`;

    const validId = await validateId({ id }, url);
    if (validId) {
      return errorRes.errorResponse400(res, validId);
    }

    const response = await scrapeDataById(res, url);

    return successRes.successResponse200(res, response);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

module.exports = { getProductByRank, getProductById };
