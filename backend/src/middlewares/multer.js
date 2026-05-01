const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const MAX_FILE_SIZE = 1 * 1024 * 1024;

// file types allowed jpg/jpeg and pdf only
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "application/pdf",
];


// storing in server for now in uploads folder
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const name = file.originalname
//       .replace(ext, "")
//       .replace(/\s+/g, "_");

//     cb(null, `${Date.now()}-${name}${ext}`);
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const format = file.mimetype.split("/")[1];

    return {
      folder: "rti_uploads",
      resource_type: format === "pdf" ? "raw" : "image",
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`,
    };
  },
});



const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, and PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});

module.exports = upload;