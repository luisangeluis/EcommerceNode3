import multer from "multer";
import path from "path";
import getCurrentDate from "./getCurrentDate";

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    console.log({ file });

    cb(null, "src/uploadedImages/");
  },
  filename: (_req, file, cb) => {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const fileName = originalName.replace(extension, ""); // Elimina la extensión del nombre original
    // Concatena el nombre original, la fecha actual y la extensión para obtener el nombre final
    // const finalFileName = `${fileName}-${Date.now()}${extension}`;

    const finalFileName = `${fileName}_${getCurrentDate()}${extension}`;
    cb(null, finalFileName);
  }
});

const upload = multer({ storage });

export default upload;
