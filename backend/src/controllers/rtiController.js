const rtiService = require("../services/rtiService");

/**
 * @desc Create a new RTI
 * @route POST /api/rti
 */
const createRTI = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    console.log(typeof(payload.isDraft));
    
    if (
      payload.isDraft !== "true" &&
      payload.isDraft !=="false"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid isDraft value. Use 'true' or 'false'.",
      });
    }

    payload.status = payload.isDraft ? "Save Draft" : "Pending";
    delete payload.isDraft;

    if (req.files?.uploadApplication?.[0]) {
      const file = req.files.uploadApplication[0];

      payload.uploadApplication = {
        path: file.path, //mkaa this url
        public_id: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      };
    }

    if (req.files?.additionalAttachments?.length) {
      payload.additionalAttachments = req.files.additionalAttachments.map(
        (file) => ({
          path: file.path,
          public_id: file.filename,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
        })
      );
    }

    const data = await rtiService.createRTI(payload);

    return res.status(201).json({
      success: true,
      message: "RTI created successfully",
      data,
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get all RTIs
 * @route GET /api/rti
 */
const getAllRTIs = async (req, res, next) => {
  try {
    const data = await rtiService.getRTIs(req.query);

    return res.status(200).json({
      success: true,
      message: "RTIs fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get RTI by ID
 * @route GET /api/rti/:id
 */
const getRTIById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await rtiService.getRTIById(id);

    return res.status(200).json({
      success: true,
      message: "RTI fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Delete RTI
 * @route DELETE /api/rti/:id
 */
const deleteRTI = async (req, res, next) => {
  try {
    const { id } = req.params;

    await rtiService.deleteRTI(id);

    return res.status(200).json({
      success: true,
      message: "RTI deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update RTI
 * @route PUT /api/rti/:id
 */
const updateRTI = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payload = { ...req.body };

    const updatedRTI = await rtiService.updateRTI(id, payload);

    return res.status(200).json({
      success: true,
      message: "RTI updated successfully",
      data: updatedRTI,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRTI,
  getAllRTIs,
  getRTIById,
  deleteRTI,
  updateRTI,
};