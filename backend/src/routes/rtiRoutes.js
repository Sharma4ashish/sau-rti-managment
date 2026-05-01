const express = require("express");
const validate = require("../middlewares/validateMiddlewares");
const router = express.Router()
const multerErrorHandler = require("../middlewares/fileErrorHandler");
const upload = require("../middlewares//multer");
const { 
    createRTI,
    getAllRTIs,
    getRTIById,
    deleteRTI,
    updateRTI
} = require("../controllers/rtiController");
const { 
    createRTISchema,
    updateRTISchema,
    getRTIsQuerySchema,
    getRTIByIdSchema,
    deleteRTISchema
} = require("../utils/validatorSchema");

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
    upload.fields([
        { name: "uploadApplication", maxCount: 1 },
        { name: "additionalAttachments", maxCount: 2 },
    ]),
    multerErrorHandler,
    validate(createRTISchema, "body"),
    createRTI
);


/**
 * @swagger
 * /rti:
 *   get:
 *     summary: Get all RTIs
 *     tags: [RTI]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page (max 20)
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *           enum: [Manager, Supervisor, Accountant]
 *         description: Filter by department
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Pending, Approved, Rejected, Save Draft]
 *         description: Filter by status
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           enum: [new, old]
 *           default: new
 *         description: Sort order by date
 *     responses:
 *       200:
 *         description: RTIs fetched successfully
 *       400:
 *         description: Validation error
 */
router.get("/",
    validate(getRTIsQuerySchema, "query"),
    getAllRTIs
);

/**
 * @swagger
 * /rti/{id}:
 *   get:
 *     summary: Get RTI by ID
 *     tags: [RTI]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: RTI ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: RTI fetched successfully
 *       400:
 *         description: Invalid RTI ID
 *       404:
 *         description: RTI not found
 */
router.get("/:id", 
    validate(getRTIByIdSchema, "params"),
    getRTIById
);

/**
 * @swagger
 * /rti/{id}:
 *   put:
 *     summary: Update RTI by ID
 *     tags: [RTI]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: RTI ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicantName:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               emailId:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *               address:
 *                 type: string
 *               subject:
 *                 type: string
 *               applicationMode:
 *                 type: string
 *                 enum: [Online, Offline]
 *               dateOfReceipt:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               department:
 *                 type: string
 *                 enum: [Manager, Supervisor, Accountant]
 *               dueDate:
 *                 type: string
 *                 format: date
 *               assignedOfficer:
 *                 type: string
 *               extendedDueDate:
 *                 type: string
 *                 format: date
 *               reminderFrequency:
 *                 type: string
 *                 enum: [3 Days, 5 Days, 7 Days, 15 Days]
 *               status:
 *                 type: string
 *                 enum: [Pending, Approved, Rejected, Save Draft]
 *               isDraft:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: RTI updated successfully
 *       400:
 *         description: Validation error or invalid date range
 *       404:
 *         description: RTI not found
 */
router.put(
    "/:id",
    validate(getRTIByIdSchema, "params"),
    validate(updateRTISchema, "body"),
    updateRTI
);

/**
 * @swagger
 * /rti/{id}:
 *   delete:
 *     summary: Delete RTI by ID
 *     tags: [RTI]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: RTI ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: RTI deleted successfully
 *       400:
 *         description: Invalid RTI ID
 *       404:
 *         description: RTI not found
 */
router.delete(
    "/:id",
    validate(deleteRTISchema, "params"),
    deleteRTI
);

module.exports = router;