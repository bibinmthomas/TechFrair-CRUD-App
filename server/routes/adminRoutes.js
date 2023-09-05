const express = require("express");
const verifyToken = require("../utils/verifyToken");
const {
  registerUser,
  authUser,
  addVehicle,
  deleteVehicle,
  editVehicle,
  getAllVehicles,
  getVehicle,
} = require("../controller/adminController");
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
router.post("/addVehicle", upload.array("recfile", 4), addVehicle);
router.get("/getVehicles", verifyToken, getAllVehicles);
router.get("/getVehicle/:id", verifyToken, getVehicle);
router.patch(
  "/editVehicle/:id",
  verifyToken,
  upload.array("recfile", 4),
  editVehicle
);
router.delete("/deleteVehicle/:id", verifyToken, deleteVehicle);

module.exports = router;
