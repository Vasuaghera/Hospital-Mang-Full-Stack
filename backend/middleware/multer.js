import multer from "multer";

const storage = multer.diskStorage({
    // Destination to store image
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

// Upload parameters for multer
const upload = multer({ storage: storage })
export default upload