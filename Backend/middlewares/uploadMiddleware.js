import multer from "multer";

const storage = multer.memoryStorage(); // store files in memory (Buffer)
const upload = multer({ storage });

export const uploadSingle = (fieldName) => upload.single(fieldName);
export const uploadMultiple = (fieldName, maxCount = 10) =>
  upload.array(fieldName, maxCount);
