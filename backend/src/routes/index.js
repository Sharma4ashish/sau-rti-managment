const express = require('express');
const router = express.Router();

const rtiRoutes = require("./rtiRoutes.js")


router.use("/rtis", rtiRoutes)
router.use('/health', (req, res) => {
    res.status(200).json({ success: true, message: ' Server Healthy' });
});


module.exports = router