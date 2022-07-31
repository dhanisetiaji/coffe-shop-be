require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require('path')


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)

    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error('Image/path is not allowed'), false)
    }
    cb(null, true)
}

const limits = {
    fileSize: 1024 * 1024 * 2
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "coffee",
    },
});

const uploadImages = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
}).single('userImage')

const upload = (req, res, next) => {
    uploadImages(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.json({
                success: false,
                message: err.message
            })
        } else if (err) {
            return res.json({
                success: false,
                message: 'Failed to upload image!'
            })
        }
        next()
    })
}

module.exports = upload