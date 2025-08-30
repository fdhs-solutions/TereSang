import multer from "multer";

// Memory storage: file stays in RAM temporarily
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
});

// Single file
export const uploadSingle = (fieldName = "file") => upload.single(fieldName);

// Multiple files
export const uploadMultiple = (fieldName = "files", maxCount = 5) =>
  upload.array(fieldName, maxCount);

// Mixed: profileImage + gallery[]
export const uploadMixed = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "gallery", maxCount: 5 },
]);

export default upload;
