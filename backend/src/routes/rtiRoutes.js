const express = require("express");
const { createRTI } = require("../controllers/rtiController");
const { get } = require("mongoose");
const router = express.Router()



/**
 * @swagger
 * /rtis:
 *   post:
 *     summary: Create a new RTI
 *     tags: [RTI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - applicantName
 *               - contactNumber
 *               - subject
 *               - department
 *               - dateOfReceipt
 *               - dueDate
 *               - reminderFrequency
 *               - applicationMode
 *             properties:
 *               applicantName:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               subject:
 *                 type: string
 *               department:
 *                 type: string
 *               dateOfReceipt:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *               reminderFrequency:
 *                 type: string
 *               applicationMode:
 *                 type: string
 *                 enum: [online, offline]
 *               description:
 *                 type: string
 *               isDraft:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: RTI created successfully
 */
router.post("/", createRTI);

// router.get("/", getAllRTIs);
// router.get("/:id", getRTI);


module.exports = router