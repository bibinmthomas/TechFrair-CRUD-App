const express = require("express");
const verifyToken = require("../utils/verifyToken");
const { registerUser, authUser } = require("../controller/adminController");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "../server/assets/images");
  },
  filename: function (req, file, cb) {
    const imageName = Date.now() + "-" + file.originalname;
    cb(null, imageName);
  },
});
const upload = multer({ storage: storage });

router.post("/register", registerUser);
router.post("/login", authUser);

module.exports = router;
