import expressAsyncHandler from "express-async-handler";
import { Products } from "../models/products.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Products.find();
  res.status(200).json(new ApiResponse(200, "success", products));
});

export const getProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json(new ApiError(400, "id is required"));
  }

  const product = await Products.findById(id);

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

  const product = await Products.create(payload);

  if (!product?._id) {
    res.status(400).json(new ApiError(400, "product not created"));
  }

  res.status(200).json(new ApiResponse(200, "success", payload));
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body; 

  if(!id){
    return res.status(400).json(new ApiError(400, "id is required"));
  }

  const newProduct = await Products.findByIdAndUpdate(id, payload, {
    new: true
  }) ;

  if(!newProduct?._id){
    return res.status(400).json(new ApiError(400, "product not updated"));
  }

  res.status(200).json(new ApiResponse(200, "success", newProduct));
});
