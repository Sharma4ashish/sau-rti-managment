const express = require("express");
const cors = require("cors");
const config = require("./config/index.js");
const apiV1Routes = require("./routes/index.js")

const setupSwagger = require("./config/swagger.js");

const app = express();

setupSwagger(app);


app.use(cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));



app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'RTI API is running' });
});

app.use("/api/v1", apiV1Routes);


module.exports = app;