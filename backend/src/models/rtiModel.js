const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    path: String,
  },
  { _id: false }
);

const rtiSchema = new mongoose.Schema(
  {
    applicantName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    contactNumber: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, 'Invalid contact number'],
    },
    emailId: {
      type: String,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    },
    address: String,

    rtiCaseNumber: {
      type: String,
      unique: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
    },
    applicationMode: {
      type: String,
      required: true,
      enum: ['online', 'offline'],
    },
    dateOfReceipt: {
      type: Date,
      required: true,
    },
    description: String,

    department: {
      type: String,
      required: true,
    },
    assignedOfficer: String,

    dueDate: {
      type: Date,
      required: true,
    },
    extendedDueDate: Date,
    reminderFrequency: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['draft', 'pending', 'verified', 'rejected'],
      default: 'draft',
    },

    uploadedApplication: documentSchema,
    additionalAttachments: [documentSchema],
  },
  { timestamps: true }
);

rtiSchema.index({ status: 1 });
rtiSchema.index({ department: 1 });

module.exports = mongoose.model('RTI', rtiSchema);