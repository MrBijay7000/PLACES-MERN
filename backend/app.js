/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();

app.use("/api/places", placesRoutes);

app.listen(5001);
