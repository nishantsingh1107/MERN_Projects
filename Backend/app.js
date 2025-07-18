const dotEnv = require("dotenv");
dotEnv.config();

const express = require("express");
require("./config/db");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const { apiRouter } = require("./api/v1/routes.js");

const app = express();

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.CLIENT_URL_LOCAL,
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log("--------------------------------");
    console.log(new Date(), req.method, req.url);
    console.log("--------------------------------");
    next();
});

app.use("/api/v1", apiRouter);

app.listen(2400, () => {
    console.log("------ Server is running --------");
});