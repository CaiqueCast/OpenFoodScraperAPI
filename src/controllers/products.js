const scrapeDataByRank = require("../services/puppeteerFunctions");

const getProductByRank = async (req, res) => {
  try {
    const nutrition = req.query.nutrition;
    const nova = req.query.nova;

    if (!nova && !nutrition) {
      return res
        .status(404)
        .json(`É necessario informar a 'nutrition' ou o grupo 'nova'.`);
    }

    let url = `https://br.openfoodfacts.org/`;
    if (!nova) {
      url += `/nutrition-grade/${nutrition}/`;
    } else if (!nutrition) {
      url += `nova-group/${nova}/`;
    } else {
      url += `/nutrition-grade/${nutrition}/nova-group/${nova}/`;
    }
    const response = await scrapeDataByRank(url);

    if (response.length === 0) {
      return res.status(404).json("Nenhum resultado encontrado");
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
};

module.exports = { getProductByRank };
