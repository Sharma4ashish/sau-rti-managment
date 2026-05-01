const ApiError = require("../utils/ApiError");
const { ZodError } = require("zod");


const validate = (schema, source = "body") => (req, res, next) => {
  try {
    console.log("---------------------------",req[source]);
    const parsedData = schema.parse(req[source] || {}); // source = body | query | params

    req[source] = parsedData;


    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.map((issue) => ({
        field: issue.path.join(".") || "unknown",
        message: issue.message,
      }));

      return next(new ApiError(400, "Validation failed", errors));
    }

    return next(new ApiError(500, "Something went wrong"));
  }
};

module.exports = validate;