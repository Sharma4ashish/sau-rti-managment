const RTI = require("../models/rtiModel");
const ApiError = require("../utils/ApiError");

/**
 * Create a new RTI
 */
const createRTI = async (payload) => {
  if (!payload.rtiCaseNumber) {
    throw new ApiError(400, "RTI Case Number is required");
  }

  const existing = await RTI.findOne({
    rtiCaseNumber: payload.rtiCaseNumber,
  });

  if (existing) {
    throw new ApiError(
      409,
      `RTI with Case Number '${payload.rtiCaseNumber}' already exists`
    );
  }

  const rti = await RTI.create(payload);

  if (!rti) {
    throw new ApiError(500, "Failed to create RTI");
  }

  return rti;
};

module.exports = {
  createRTI,
};