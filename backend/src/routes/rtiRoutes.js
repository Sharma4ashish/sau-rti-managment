const express = require("express");
const { createRTI, getAllRTIs, getRTIById,deleteRTI } = require("../controllers/rtiController");
const validate = require("../middlewares/validateMiddlewares");
const { createRTISchema, getRTIsQuerySchema, getRTIByIdSchema,deleteRTISchema } = require("../utils/validatorSchema");
const router = express.Router()


/**
 * @swagger
 * /rti:
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
 *                 enum: [Online, Offline]
 *               description:
 *                 type: string
 *               isDraft:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: RTI created successfully
 */
router.post("/",
    validate(createRTISchema, "body"),
    createRTI
);


router.get("/:id", validate(getRTIByIdSchema,
    "params"),
    getRTIById
);


router.get("/",
    validate(getRTIsQuerySchema, "query"),
    getAllRTIs
);


router.delete(
  "/:id",
  validate(deleteRTISchema, "params"),
  deleteRTI
);


module.exports = router;