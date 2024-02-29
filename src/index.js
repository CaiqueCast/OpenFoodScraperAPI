const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger.json");
const routes = require("./routes/routes");
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);
app.listen(80);
