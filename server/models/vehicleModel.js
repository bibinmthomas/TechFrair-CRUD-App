const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  availableQuantity: {
    type: Number,
  },
  primaryImage: {
    type: String,
  },
  secondaryImages: [
    {
      type: String,
    },
  ],
  manufacturer: {
    type: String,
  },
  model: {
    type: String,
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
