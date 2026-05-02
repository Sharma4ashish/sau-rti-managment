const RTI = require("../models/rtiModel");
const ApiError = require("../utils/ApiError");

/**
 * @desc Create a new RTI
 */
// const createRTI = async (payload) => {

//     //deletefiles multer uploaded if error happer in between saving data to db

//     // if (!payload.rtiCaseNumber) {
//     //   throw new ApiError(400, "RTI Case Number is required");
//     // }

//     if (!payload.department) {
//       throw new ApiError(400, "Department is required");
//     }
//     payload.rtiCaseNumber = await generateRTICaseNumber(payload.department);


//   const existing = await RTI.findOne({
//     rtiCaseNumber: payload.rtiCaseNumber,
//   });

//   if (existing) {
//     throw new ApiError(
//       409,
//       `RTI with Case Number '${payload.rtiCaseNumber}' already exists`
//     );
//   }

//   const rti = await RTI.create(payload);

//   if (!rti) {
//     throw new ApiError(500, "Failed to create RTI");
//   }

//   return rti;
// };

const createRTI = async (payload) => {
  if (!payload.department) {
    throw new ApiError(400, "Department is required");
  }

  const year = new Date().getFullYear();

  // initial count
  let count = await RTI.countDocuments({ department: payload.department });

  let attempts = 0;
  let rti;

  while (!rti && attempts < 5) {
    try {
      const sequence = String(count + 1).padStart(4, "0");

      payload.rtiCaseNumber = `RTI/${year}/${payload.department.toUpperCase()}/${sequence}`;

      rti = await RTI.create(payload);
    } catch (error) {
      if (error.code === 11000) {
        attempts++;
        count++; // 🔥 force next number
      } else {
        throw error;
      }
    }
  }

  if (!rti) {
    throw new ApiError(
      500,
      "Could not generate unique RTI number. Try again."
    );
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
      .select("rtiCaseNumber applicantName department status createdAt")
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
// const deleteRTI = async (id) => {
//   const rti = await RTI.findOne({
//     _id: id,
//     isDeleted: false,
//   });

//   if (!rti) {
//     throw new ApiError(404, "RTI not found");
//   }

//   rti.isDeleted = true;
//   rti.deletedAt = new Date();

//   await rti.save();
// };


const deleteRTI = async (id) => {
  const rti = await RTI.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      $set: {
        isDeleted: true,
        },
    },
    { new: true }
  );

  if (!rti) {
    throw new ApiError(404, "RTI not found or already deleted");
  }

  return rti;
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


const generateRTICaseNumber = async (department) => {
  const year = new Date().getFullYear();

  // count all records for this department
  const count = await RTI.countDocuments({ department });

  const sequence = String(count + 1).padStart(4, "0");

  return `RTI/${year}/${department.toUpperCase()}/${sequence}`;
};

module.exports = {
  createRTI,
  getRTIs,
  getRTIById,
  deleteRTI,
  updateRTI,
};