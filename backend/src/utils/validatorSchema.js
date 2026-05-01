const { z } = require("zod");

const createRTISchema = z.object({
  applicantName: z.string({ required_error: "Applicant name is required" }).min(1, "Applicant name is required").max(100),
  contactNumber: z
    .string({ required_error: "Contact number is required" })
    .regex(/^[+]?[\d\s\-()]{7,15}$/, "Invalid contact number"),

  gender: z.enum(["Male", "Female", "Other"]).optional(),
  emailId: z.string().email("Invalid email").optional(),
  address: z.string().max(300).optional(),

  rtiCaseNumber: z
      .string({ required_error: "RTI Case Number is required" })
      .min(1, "RTI Case Number is required")
      .transform((val) => val.toUpperCase()),
  subject: z.string({ required_error: "Subject is required" }).min(1, "Subject is required").max(200),
  applicationMode: z.enum(["Online", "Offline"], { errorMap: () => ({ message: "Application mode is required and must be Online or Offline" }) }),
  dateOfReceipt: z.coerce.date({ required_error: "Date of receipt is required", invalid_type_error: "Date of receipt must be a valid date" }),

  description: z.string().max(1000).optional(),

  department: z.enum(["Manager", "Supervisor", "Accountant"], { errorMap: () => ({ message: "Department is required and must be Manager, Supervisor, or Accountant" }) }),
  dueDate: z.coerce.date({ required_error: "Due date is required", invalid_type_error: "Due date must be a valid date" }),

  assignedOfficer: z.string().optional(),
  extendedDueDate: z.coerce.date().optional(),
  reminderFrequency: z.enum([
    "3 Days",
    "5 Days",
    "7 Days",
    "15 Days",
  ], { errorMap: () => ({ message: "Reminder frequency is required and must be 3 Days, 5 Days, 7 Days, or 15 Days" }) }),

  isDraft: z.boolean().optional(),
});

module.exports = {
  createRTISchema,
};