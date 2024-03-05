import multer from "multer";
import path from "path";
import getCurrentDate from "./getCurrentDate";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "src/uploadedImages/");
  },
  filename: (_req, file, cb) => {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const fileName = originalName.replace(extension, "");
    const finalFileName = `${fileName}_${getCurrentDate()}${extension}`;
    cb(null, finalFileName);
  }
});

const fileFilter = function (_req: any, file: any, cb: any) {
  // Verifica el tipo de archivo
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    // Acepta el archivo
    cb(null, true);
  } else {
    const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE");
    error.message = "Tipo de archivo no admitido";
    cb(error, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});

export default upload;
