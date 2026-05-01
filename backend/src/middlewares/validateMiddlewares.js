const ApiError = require("../utils/ApiError");
const { ZodError } = require("zod");

const validate = (schema) => (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    req.body = data;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.map((issue) => ({
        field: issue.path.join(".") || "unknown",
        message: issue.message,
      }));

      return next(
        new ApiError(400, "Validation failed", errors)
      );
    }

    next(new ApiError(500, "Something went wrong"));
  }
};

module.exports = validate;