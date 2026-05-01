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







const getAllRTIs = async (req, res, next) => {
  try {
    const query = req.query;
    console.log("-----------------------------", req.query);

    const data = await rtiService.getRTIs(query);

    res.status(200).json({
      success: true,
      message: "RTIs fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};







/**
 *
 * @param {\} req ID in params} req
 * @param {*} res RTI data in response
 */
const getRTIById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await rtiService.getRTIById(id);

    res.status(200).json({
      success: true,
      message: "RTI fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};







const deleteRTI = async (req, res, next) => {
  try {
    const { id } = req.params;

    await rtiService.deleteRTI(id);

    res.status(200).json({
      success: true,
      message: "RTI deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};






module.exports = {
  createRTI,
  getAllRTIs,
  getRTIById,
  deleteRTI
};
