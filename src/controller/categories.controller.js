import expressAsyncHandler from "express-async-handler";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getCategories = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  if (name) {
    const categories = await Category.find({ name });
    res.status(200).json(new ApiResponse(200, "success", categories));
  }

  const categories = await Category.find();
  res.status(200).json(new ApiResponse(200, "success", categories));
});

export const createCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json(new ApiError(400, "name is required"));
  }

  const category = await Category.create({ name });

  if (!category?._id) {
    return res.status(400).json(new ApiError(400, "category not created"));
  }

  res.status(200).json(new ApiResponse(200, "success", category));
});

export const getCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category?._id) {
    return res.status(404).json(new ApiError(404, "category not found"));
  }

  res.status(200).json(new ApiResponse(200, "success", category));
});

export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if(!id){
    return res.status(400).json(new ApiError(400, "id is required"));
  }

  if (!name) {
    res.status(400).json(new ApiError(400, "name is required"));
  }

  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );

  if (!category?._id) {
    return res.status(404).json(new ApiError(404, "category not found"));
  }

  res.status(200).json(new ApiResponse(200, "success", category));
});

export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category?._id) {
    return res.status(404).json(new ApiError(404, "category not found"));
  }
  res.status(200).json(new ApiResponse(200, "success", null));
});
