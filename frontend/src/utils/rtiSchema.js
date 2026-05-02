import { z } from "zod";


//Checking all the required fields and in correct format
//For optional fields, we are just checking the format if they are provided not
export const rtiSchema = z.object({
  applicantName: z
    .string()
    .min(1, "Applicant name is required")
    .max(100),

  contactNumber: z
    .string()
    .regex(/^[+]?[\d\s\-()]{7,15}$/, "Invalid contact number"),

  gender: z.enum(["Male", "Female", "Other"]).optional(),

    emailId: z
    .string()
    .optional()
    .refine(
        (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        "Invalid email"
    ),
  
  address: z.string().max(300).optional(),

  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200),

  applicationMode: z.enum(["Online", "Offline"]),

  dateOfReceipt: z.string().min(1, "Date is required"),

  department: z.enum(["Manager", "Supervisor", "Accountant"]),

  dueDate: z.string().min(1, "Due date is required"),

  extendedDueDate: z.string().optional(),

  reminderFrequency: z.enum([
    "3 Days",
    "5 Days",
    "7 Days",
    "15 Days",
  ]),

  description: z.string().max(1000).optional(),

  document: z
      .any()
      .optional()
      .refine(
        (file) => !file || file.length === 0 || file[0]?.type,
        "Invalid file"
      )
      .refine(
        (file) =>
          !file ||
          file.length === 0 ||
          ["image/jpeg", "image/jpg", "application/pdf"].includes(
            file[0]?.type
          ),
        "Only JPG, JPEG, PDF allowed"
      )
      .refine(
        (file) =>
          !file ||
          file.length === 0 ||
          file[0]?.size <= 1 * 1024 * 1024,
        "Max file size is 1MB"
      ),
})
.refine(
  (data) =>
    !data.extendedDueDate ||
    new Date(data.extendedDueDate) > new Date(data.dueDate),
  {
    message: "Extended date must be after due date",
    path: ["extendedDueDate"],
  }
);