const mongoose = require('mongoose');


// shcema for files jpeg and jpg only 
const documentSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      default: null,
      trim: true,
    },

    originalName: {
      type: String,
      default: null,
      trim: true,
    },

    mimetype: {
      type: String,
      required: true,
      enum: {
        values: ["image/jpeg", "image/jpg","application/pdf"],
        message: "Only JPEG/JPG/PDF files are allowed",
      },
    },

    size: {
      type: Number,
      default: null,
      max: [1 * 1024 * 1024, "File size should not exceed 1MB"], // optional limit 
    },

    path: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const rtiSchema = new mongoose.Schema(
  {  

    /* ------------------------ Applicant Details -------------- */
    applicantName: {
      type: String,
      required: [true, "Applicant name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      match: [
        /^[+]?[\d\s\-()]{7,15}$/,
        "Please enter a valid contact number",
      ],
    },

    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is not a valid gender",
      },
      default: null,
    },

    emailId: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
      default: null,
    },

    address: {
      type: String,
      trim: true,
      maxlength: [300, "Address cannot exceed 300 characters"],
      default: null,
    },


    
    /* --------------------------- RTI Details -------------------------------- */
    rtiCaseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },

    applicationMode: {
      type: String,
      required: [true, "Application mode is required"],
      enum: {
        values: ["Online", "Offline"],
        message: "{VALUE} is not a valid application mode",
      },
    },

    dateOfReceipt: {
      type: Date,
      required: [true, "Date of receipt is required"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: null,
    },

    /* ------------------- Department Details ---------------- */
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: ["Manager", "Supervisor", "Accountant"],
        message: "{VALUE} is not a valid department",
      },
    },

    assignedOfficer: {
      type: String,
      trim: true,
      default: null,
    },

    /* ----------------------- Timeline ---------------- */
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    // Must be greater than dueDate if provided
    extendedDueDate: {
      type: Date,
      default: null,
      validate: {
        validator: function (value) {
          return !value || value > this.dueDate;
        },
        message: "Extended due date must be after the due date",
      },
    },

    reminderFrequency: {
      type: String,
      required: [true, "Reminder frequency is required"],
      enum: {
        values: ["3 Days", "5 Days", "7 Days", "15 Days"],
        message: "{VALUE} is not a valid reminder frequency",
      },
    },




    /* ---------------- Documents ---------------- */
    uploadApplication: {
      type: documentSchema,
      default: null,
    },

    additionalAttachments: {
      type: [documentSchema],
      default: [],
      validate: {
        validator: (val) => val.length <= 2,
        message: "Max 2 attachments allowed",
      },
    },

    /* ---------------- Status ---------------- */
    status: {
      type: String,
      enum: {
        values: ["Pending", "Verified", "Rejected", "Save Draft"],
        message: "{VALUE} is not a valid status",
      },
      default: "Pending",
    },

    /* --------------------- Soft Deleting ---------------- */
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// rtiSchema.index({ rtiCaseNumber: 1 });
rtiSchema.index({ status: 1 });
rtiSchema.index({ createdAt: -1 });
rtiSchema.index({ department: 1});





module.exports = mongoose.model('RTI', rtiSchema);