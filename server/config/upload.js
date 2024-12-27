const path = require('path');
const fs = require('fs');

// Utility functions for handling uploads
const uploadUtils = {
  // Create upload directory if it doesn't exist
  createUploadDir: () => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  },

  // Delete file from local storage
  deleteFile: (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  },

  // Validate file type
  validateFileType: (file) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    return extname && mimetype;
  },

  // Generate unique filename
  generateFileName: (originalname) => {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1E9);
    const extension = path.extname(originalname);
    return `file-${timestamp}-${random}${extension}`;
  }
};

module.exports = uploadUtils;