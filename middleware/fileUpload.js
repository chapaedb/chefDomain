const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
       
        callback(null, `${file.originalname.replace(file.originalname.extension, "")}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype === 'image/jpg' || 
            file.mimetype === 'image/jpeg' || 
            file.mimetype === 'image/png' || 
            file.mimetype === 'image/webp') {
            callback(null, true);
        } else {
            callback(new Error("Only jpeg, jpg, png, webp formats are allowed."));
        }
    }
}).array('image', 3);

module.exports = upload;
