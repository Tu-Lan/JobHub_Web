import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file || !file.originalname || !file.buffer) {
    throw new Error("Invalid file object");
  }

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toLowerCase();

  // Ensure the file extension is valid
  if (!extName) {
    throw new Error("Unable to determine file extension");
  }

  return parser.format(extName, file.buffer);
};

export default getDataUri;
