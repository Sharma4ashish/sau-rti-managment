const RTI = require("../models/rtiModel");
const ApiError = require("../utils/ApiError");

/**
 * @desc Create a new RTI
 */
const createRTI = async (payload) => {

  //deletefiles multer uploaded if error happer in between saving data to db

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

/**
 * @desc Get RTIs with pagination and filtersa
 */
const getRTIs = async (query) => {
  let { page = 1, limit = 10, department, status, date } = query;

  page = Math.max(1, parseInt(page));
  limit = Math.min(20, parseInt(limit));

  const filter = { isDeleted: false };

  if (department) filter.department = department;
  if (status) filter.status = status;

  const sort = {
    createdAt: date === "new" ? -1 : 1,
  };

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    RTI.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select("rtiNumber applicantName department status createdAt")
      .lean(),

    RTI.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
};

/**
 * @desc Get RTI by ID
 */
const getRTIById = async (id) => {
  const rti = await RTI.findOne({
    _id: id,
    isDeleted: false,
  }).lean();

  if (!rti) {
    throw new ApiError(404, "RTI not found");
  }

  return rti;
};

/**
 * @desc Soft delete RTI
 */
const deleteRTI = async (id) => {
  const rti = await RTI.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!rti) {
    throw new ApiError(404, "RTI not found");
  }

  rti.isDeleted = true;
  rti.deletedAt = new Date();

  await rti.save();
};

/**
 * @desc Update RTI
 */
const updateRTI = async (id, payload) => {
  delete payload.rtiCaseNumber;
  delete payload.createdAt;
  delete payload.isDeleted;
  delete payload.deletedAt;

  if (!Object.keys(payload).length) {
    throw new ApiError(400, "No fields provided for update");
  }

  const updated = await RTI.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: payload },
    {
      new: true,
      runValidators: true,
    }
  ).lean();

  if (!updated) {
    throw new ApiError(404, "RTI not found");
  }

  return updated;
};

module.exports = {
  createRTI,
  getRTIs,
  getRTIById,
  deleteRTI,
  updateRTI,
};