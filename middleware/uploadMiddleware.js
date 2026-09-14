const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "text/plain",
        "application/pdf",
    ];

    const allowedExtensions = [
        ".txt",
        ".pdf",
    ];

    const extension = file.originalname
        .substring(file.originalname.lastIndexOf("."))
        .toLowerCase();

    if (
        allowedMimeTypes.includes(file.mimetype) &&
        allowedExtensions.includes(extension)
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only TXT and PDF files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

module.exports = upload;