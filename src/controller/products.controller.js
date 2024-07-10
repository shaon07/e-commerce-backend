import expressAsyncHandler from "express-async-handler";
import { Products } from "../models/products.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getProducts = expressAsyncHandler(async (req, res) => {
  const sortBy = req.query.sort;
  if (sortBy === "desc") {
    const products = await Products.find({ user: req.user.id }).sort({
      price: -1,
    });
    res
      .status(200)
      .json(
        new ApiResponse(200, products.length > 0 ? "success" : "fail", products)
      );
  }

  const products = await Products.find({ user: req.user.id })
    .populate("category")
    .select("-user")
    .sort({ price: 1 });

  res
    .status(200)
    .json(
      new ApiResponse(200, products.length > 0 ? "success" : "fail", products)
    );
});

export const getProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json(new ApiError(400, "id is required"));
  }

  const product = await Products.find({ user: req.user.id, _id: id })
    .populate("category")
    .select("-user");

  if (!product) {
    return res.status(404).json(new ApiError(404, "product not found"));
  }

  return res.status(200).json(new ApiResponse(200, "success", product));
});

export const createProduct = expressAsyncHandler(async (req, res) => {
  const payload = req.body;

  if (!payload?.title) {
    res.status(400).json(new ApiError(400, "title is required"));
  }

  if (!payload?.price) {
    res.status(400).json(new ApiError(400, "price is required"));
  }

  if (!payload?.category) {
    res.status(400).json(new ApiError(400, "category is required"));
  }

  if (!payload?.description) {
    res.status(400).json(new ApiError(400, "description is required"));
  }

  if (!payload?.image) {
    res.status(400).json(new ApiError(400, "image is required"));
  }

  const productDetail = {
    ...payload,
    user: req.user.id,
  };

  const product = await Products.create(productDetail);

  if (!product?._id) {
    res.status(400).json(new ApiError(400, "product not created"));
  }

  res.status(200).json(new ApiResponse(200, "success", payload));
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  if (!id) {
    return res.status(400).json(new ApiError(400, "id is required"));
  }

  const newProduct = await Products.findOneAndUpdate(
    {
      _id: id,
      user: req.user.id,
    },
    payload,
    {
      new: true,
    }
  ).select("-user");

  if (!newProduct?._id) {
    return res.status(400).json(new ApiError(400, "product not updated"));
  }

  res.status(200).json(new ApiResponse(200, "success", newProduct));
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Products.findOneAndDelete({
    _id: id,
    user: req.user.id,
  });

  if (!product?._id) {
    return res.status(400).json(new ApiError(400, "product not deleted"));
  }
  res.status(200).json(new ApiResponse(200, "success", null));
});
