const express = require("express");
const { getProductByRank, getProductById } = require("../controllers/products");

const routes = express();

routes.get("/products", getProductByRank);
routes.get("/products/:id", getProductById);

module.exports = routes;
