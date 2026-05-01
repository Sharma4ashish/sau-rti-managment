const express = require('express');
const router = express.Router();

const rtiRoutes = require("./rtiRoutes.js")


router.use("/rtis", rtiRoutes)


module.exports = router