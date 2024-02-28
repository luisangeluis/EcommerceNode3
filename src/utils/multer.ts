import multer from "multer";
import path from "path";
import getCurrentDate from "./getCurrentDate";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "uploadedImages"));
  },
  filename: (_req, file, cb) => {
    console.log({ file });

    cb(null, file.originalname + "-" + getCurrentDate() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;
