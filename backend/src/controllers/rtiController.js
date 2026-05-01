const rtiService = require("../services/rtiService");

/**
 * Create RTI
 */
const createRTI = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    // transformation only (allowed in controller)
    payload.status = payload.isDraft ? "Save Draft" : "Pending";
    delete payload.isDraft;

    if (req.file) {
      payload.uploadApplication = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
      };
    }

    if (req.files && Array.isArray(req.files)) {
      payload.additionalAttachments = req.files.map((file) => ({
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
      }));
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



// pagination and and filtering and searching and all that s
const getAllRTIs = async (req, res, next) => {
  try {
    res.status(501).json({
      success: false,
      message: "createRTI not implemented yet",
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  createRTI,
  getAllRTIs
};