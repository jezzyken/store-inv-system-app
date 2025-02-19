const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
 destination: './uploads/',
 filename: (req, file, cb) => {
   cb(null, `${Date.now()}-${file.originalname}`); 
 }
});

const upload = multer({
 storage,
 limits: { fileSize: 5000000 },
 fileFilter: (req, file, cb) => {
   const filetypes = /jpeg|jpg|png/;
   const mimetype = filetypes.test(file.mimetype);
   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
   
   if (mimetype && extname) return cb(null, true);
   cb('Error: Images only');
 }
});

router.post('/', upload.single('file'), (req, res) => {
 if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
 res.json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;