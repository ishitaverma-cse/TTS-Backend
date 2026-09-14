const { extractTextFromFile } = require("../services/fileService");

const extractFileText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const extractedText = await extractTextFromFile(req.file);

    if (!extractedText.trim()) {
      return res.status(400).json({
        success: false,
        message: "No readable text found in the file",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        text: extractedText.trim(),
      },
    });
  } catch (error) {
    console.error("File Extraction Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to extract text from file",
    });
  }
};

module.exports = {
  extractFileText,
};