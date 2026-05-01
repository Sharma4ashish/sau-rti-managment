const createRTI = async (req, res, next) => {
  try {
    res.status(501).json({
      success: false,
      message: "createRTI not implemented yet",
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