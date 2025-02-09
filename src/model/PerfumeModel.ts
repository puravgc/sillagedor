const mongoose = require("mongoose");

// Define the perfume product schema
const perfumeProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String], // e.g., ["men", "unisex", "luxury"]
      enum: ["men", "women", "unisex", "luxury"],
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the model based on the schema
const PerfumeProduct = mongoose.model("PerfumeProduct", perfumeProductSchema);

module.exports = PerfumeProduct;
