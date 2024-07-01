import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: "String",
      required: true,
      index: true,
    },
    price: {
      type: "Number",
      required: true,
    },
    category: {
      type: "String",
      required: true,
    },
    description: {
      type: "String",
      required: true,
    },
    image: {
      type: "String",
      required: true,
    },
  },
  { timestamps: true }
);

export const Products = mongoose.model("Product", productSchema)