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


/**
 * Get paginated RTIs with optional filters and sorting
 */
const getRTIs = async (query) => {
  const { page, limit, department, status, date } = query;

  const filter = {
    isDeleted: false,  // only fetch non-deleted RTIs
  };

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



const getRTIById = async (id) => {
  
  const rti = await RTI.findOne({
    _id: id,
    isDeleted: false,
  })

  if (!rti) {
    throw new ApiError(404, "RTI not found");
  }

  return rti;
};




const deleteRTI = async (id) => {
  const rti = await RTI.findOne({ _id: id, isDeleted: false });

  if (!rti) {
    throw new ApiError(404, "RTI not found");
  }

  rti.isDeleted = true;
  await rti.save();
};



module.exports = {
  createRTI,
  getRTIs,
  getRTIById,
  deleteRTI
};