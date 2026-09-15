const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

const extractTextFromFile = async (file) => {
  if (!file) {
    throw new Error("File is required");
  }

  const extension = file.originalname
    .split(".")
    .pop()
    .toLowerCase();

  // TXT extraction
  if (extension === "txt") {
    return file.buffer.toString("utf-8");
  }

  // PDF extraction
  if (extension === "pdf") {
    const parser = new PDFParse({ data: file.buffer });
    const pdfData = await parser.getText();

    await parser.destroy();

    return pdfData.text;
  }

  // DOCX extraction
  if (extension === "docx") {
    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    });

    return result.value;
  }

  throw new Error(
    "Unsupported file type. Only TXT, PDF and DOCX files are allowed"
  );
};

module.exports = {
  extractTextFromFile,
};