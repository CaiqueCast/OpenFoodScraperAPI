const express = require("express");
const { getProductByRank } = require("./controllers/products");

const routes = express();

routes.get("/products", getProductByRank);
routes.get("/products/:id");

module.exports = routes;
