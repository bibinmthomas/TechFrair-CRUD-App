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
};
