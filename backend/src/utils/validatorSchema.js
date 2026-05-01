const { z } = require("zod");
const mongoose = require("mongoose");

const {
  GENDER,
  APPLICATION_MODE,
  DEPARTMENTS,
  REMINDER_FREQUENCY,
  STATUS,
} = require("../utils/constants");





/* ---------------- CREATE SCHEMA ---------------- */

const createRTISchema = z
  .object({
    applicantName: z
      .string({ required_error: "Applicant name is required" })
      .min(1, "Applicant name is required")
      .max(100),

    contactNumber: z
      .string({ required_error: "Contact number is required" })
      .regex(/^[+]?[\d\s\-()]{7,15}$/, "Invalid contact number"),

    gender: z.enum(GENDER).optional(),
    emailId: z.string().email("Invalid email").optional(),
    address: z.string().max(300).optional(),

    rtiCaseNumber: z
      .string({ required_error: "RTI Case Number is required" })
      .min(1, "RTI Case Number is required")
      .transform((val) => val.toUpperCase()),

    subject: z
      .string({ required_error: "Subject is required" })
      .min(1, "Subject is required")
      .max(200),

    applicationMode: z.enum(APPLICATION_MODE, {
      errorMap: () => ({
        message: "Application mode must be Online or Offline",
      }),
    }),

    dateOfReceipt: z.coerce.date({
      required_error: "Date of receipt is required",
      invalid_type_error: "Date of receipt must be a valid date",
    }),

    description: z.string().max(1000).optional(),

    department: z.enum(DEPARTMENTS, {
      errorMap: () => ({
        message:
          "Department must be Manager, Supervisor, or Accountant",
      }),
    }),

    dueDate: z.coerce.date({
      required_error: "Due date is required",
      invalid_type_error: "Due date must be a valid date",
    }),

    assignedOfficer: z.string().optional(),
    extendedDueDate: z.coerce.date().optional(),

    reminderFrequency: z.enum(REMINDER_FREQUENCY, {
      errorMap: () => ({
        message:
          "Reminder frequency must be 3, 5, 7 or 15 Days",
      }),
    }),

    status: z.enum(STATUS).optional(),

    isDraft: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.extendedDueDate || data.extendedDueDate > data.dueDate,
    {
      message: "Extended due date must be after due date",
      path: ["extendedDueDate"],
    }
  );





/* ---------------- UPDATE SCHEMA ---------------- */

const updateRTISchema = z
  .object({
    applicantName: z.string().min(1).max(100).optional(),
    contactNumber: z
      .string()
      .regex(/^[+]?[\d\s\-()]{7,15}$/, "Invalid contact number")
      .optional(),

    gender: z.enum(GENDER).optional(),
    emailId: z.string().email("Invalid email").optional(),
    address: z.string().max(300).optional(),

    // ❌ intentionally NOT included → cannot be updated
    // rtiCaseNumber

    subject: z.string().min(1).max(200).optional(),

    applicationMode: z.enum(APPLICATION_MODE).optional(),

    dateOfReceipt: z.coerce.date().optional(),

    description: z.string().max(1000).optional(),

    department: z.enum(DEPARTMENTS).optional(),
    assignedOfficer: z.string().optional(),

    dueDate: z.coerce.date().optional(),
    extendedDueDate: z.coerce.date().optional(),

    reminderFrequency: z.enum(REMINDER_FREQUENCY).optional(),

    status: z.enum(STATUS).optional(),

    isDraft: z.coerce.boolean().optional(),
  })
  .refine(
    (data) => {
      if (!data.extendedDueDate) return true;
      if (!data.dueDate) return true;
      return data.extendedDueDate > data.dueDate;
    },
    {
      message: "Extended due date must be after due date",
      path: ["extendedDueDate"],
    }
  );

/* ---------------- GET LIST SCHEMA ---------------- */

const getRTIsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(20).default(10),

  department: z.enum(DEPARTMENTS).optional(),
  status: z.enum(STATUS).optional(),

  date: z.enum(["new", "old"]).default("new"),
});

/* ---------------- PARAM SCHEMAS ---------------- */

const getRTIByIdSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid RTI ID",
  }),
});

const deleteRTISchema = z.object({
  id: z.string().refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid RTI ID" }
  ),
});

/* ---------------- EXPORT ---------------- */

module.exports = {
  createRTISchema,
  updateRTISchema,
  getRTIsQuerySchema,
  getRTIByIdSchema,
  deleteRTISchema,
};