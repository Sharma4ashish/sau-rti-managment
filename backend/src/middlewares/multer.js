const multer = require("multer");
const path = require("path");

const MAX_FILE_SIZE = 2 * 1024 * 1024;

// file types allowed jpg/jpeg and pdf only
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "application/pdf",
];


// storing in server for now in uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname
      .replace(ext, "")
      .replace(/\s+/g, "_");

    cb(null, `${Date.now()}-${name}${ext}`);
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