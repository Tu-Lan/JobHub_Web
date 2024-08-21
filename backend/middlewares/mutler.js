import multer from "multer";

const storage = multer.memoryStorage();

// Thiết lập giới hạn kích thước file là 20MB
export const singleUpload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
}).single("file");
