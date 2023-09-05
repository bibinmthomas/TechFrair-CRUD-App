const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
const Vehicle = require("../models/vehicleModel");
module.exports = {
  registerUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userExists = await User.findOne({ email: email });

      if (userExists) {
        return res.status(400).json({ error: "User Already Exists" });
      }

      const user = await User.create({
        name,
        email,
        password,
      });
      if (user) {
        // console.log(user);
        const token = await generateToken(user._id);
        return res.status(201).json({
          // name: user.name,
          // email: user.email,
          // token: token,
          message: "Registration Complete",
        });
      } else {
        return res.status(400).json({ error: "Registration Failed" });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: "An Error Occurred" });
    }
  },
  authUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.status(200).json({
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      res.status(404).json({ message: "Invalid EmailID or Password" });
      throw new Error("Invalid Email or Password");
    }
  }),
  addVehicle: asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { name, description, price, quantity, manufacturer, model } =
      req.body;
    const filenames = req.files.map((file) => file.filename);
    const primaryImage = filenames[0];
    const secondaryImages = req.files.map((file) => file.filename);
    // console.log(secondaryImages);
    try {
      const newVehicle = new Vehicle({
        name,
        description,
        price,
        availableQuantity: quantity,
        manufacturer,
        model,
        primaryImage,
        secondaryImages,
      });
      const savedVehicle = await newVehicle.save();
      // console.log(savedVehicle);
      res.status(201).json(savedVehicle);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Failed to add the vehicle." });
    }
  }),
  getAllVehicles: asyncHandler(async (req, res) => {
    try {
      const vehicles = await Vehicle.find();
      if (!vehicles) {
        res.status(404).json({ message: "No vehicles found." });
      } else {
        res.status(200).json(vehicles);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Failed to fetch vehicles." });
    }
  }),
  getVehicle: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const vehicle = await Vehicle.findById(id);
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found." });
      }
      res.status(200).json(vehicle);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Failed to fetch vehicle details." });
    }
  }),
  deleteVehicle: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const vehicle = await Vehicle.findById(id);
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found." });
      }
      const deletedVehicle = await Vehicle.deleteOne({ _id: id });
      if (deletedVehicle.deletedCount === 1) {
        res.status(200).json({ message: "Vehicle deleted successfully." });
      } else {
        res.status(500).json({ message: "Failed to delete vehicle." });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Failed to delete vehicle." });
    }
  }),
  editVehicle: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity, manufacturer, model } =
      req.body;
    console.log(req.files);
    const filenames = req.files.map((file) => file.filename);
    const primaryImage = filenames[0];
    const secondaryImages = req.files.map((file) => file.filename);
    try {
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        id,
        {
          name,
          description,
          price,
          availableQuantity: quantity,
          manufacturer,
          model,
          primaryImage,
          secondaryImages,
        },
        { new: true }
      );
      if (!updatedVehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      res.status(200).json(updatedVehicle);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Failed to update the vehicle." });
    }
  }),
};
