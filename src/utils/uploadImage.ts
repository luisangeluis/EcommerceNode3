import fileUpload from "express-fileupload";

const uploadImage = fileUpload({
  useTempFiles: true,
  tempFileDir: "src/uploads",
  limits: { fileSize: 8 * 1024 * 1024 },
  abortOnLimit: true,
});

export default uploadImage;
