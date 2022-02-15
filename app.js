const express = require("express");
const app = express();
const ProductRouter = require("./app/product/routes");
const ProductRouterV2 = require("./app/product_v2/routes");
require("./config/mongoose");
const path = require("path");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.urlencoded({ extends: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", ProductRouter);
app.use("/api/v2", ProductRouterV2);

app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "failed",
    message: "Resource " + req.originalUrl + " not found",
  });
});

app.listen(3000, () => console.log("Server: http://localhost:3000"));
