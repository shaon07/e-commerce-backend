import expressAsyncHandler from "express-async-handler";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { emailValidator } from "../utils/index.js";

export const generateAccessAndRefreshToken = async (userID) => {
  const user = await User.findById(userID);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken");
  res.status(200).json(new ApiResponse(200, "success", users));
});

export const getUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, "id is required"));
  }

  const user = await User.findById(id).select("-password -refreshToken");

  if (!user?._id) {
    return res.status(404).json(new ApiResponse(404, "user not found"));
  }

  res.status(200).json(new ApiResponse(200, "success", user));
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile } = req.body;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, "id is required"));
  }

  const prevUser = await User.findById(id);

  if (!prevUser?._id) {
    return res.status(404).json(new ApiResponse(404, "user not found"));
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      name: name || prevUser.name,
      email: email || prevUser.email,
      mobile: mobile || prevUser.mobile,
    },
    { new: true }
  ).select("-password -refreshToken");

  if (!user?._id) {
    return res.status(400).json(new ApiResponse(400, "user not updated"));
  }

  res.status(200).json(new ApiResponse(200, "success", user));
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, "id is required"));
  }

  const user = await User.findByIdAndDelete(id);

  if (!user?._id) {
    return res.status(400).json(new ApiResponse(400, "user not deleted"));
  }

  res.status(200).json(new ApiResponse(200, "success", null));
});

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name) {
    return res.status(400).json(new ApiResponse(400, "name is required"));
  }

  if (!email) {
    return res.status(400).json(new ApiResponse(400, "email is required"));
  }

  if (!emailValidator(email)) {
    return res.status(400).json(new ApiResponse(400, "email is not valid"));
  }

  if (!password) {
    return res.status(400).json(new ApiResponse(400, "password is required"));
  }

  if (!mobile) {
    return res.status(400).json(new ApiResponse(400, "mobile is required"));
  }

  const payload = {
    name,
    email,
    password,
    mobile,
  };

  const user = await User.findOne({
    $or: [{ name }, { email }, { mobile }],
  });

  if (user?._id) {
    return res.status(400).json(new ApiResponse(400, "user already exists"));
  }

  const createdUser = await User.create(payload);

  if (!createdUser?._id) {
    return res.status(400).json(new ApiResponse(400, "user not created"));
  }

  const userData = await User.findById(createdUser._id).select("-password");

  res.status(200).json(new ApiResponse(200, "success", userData));
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, mobile, password } = req.body;

  if (!email && !mobile) {
    return res
      .status(400)
      .json(new ApiResponse(400, "email or mobile is required"));
  }

  if (!password) {
    return res.status(400).json(new ApiResponse(400, "password is required"));
  }

  const prevUser = await User.findOne({
    $or: [{ email }, { mobile }],
  })

  if (!prevUser?._id) {
    return res.status(404).json(new ApiResponse(404, "user not found"));
  }

  const isPasswordMatch = await prevUser.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(400).json(new ApiResponse(400, "password is incorrect"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    prevUser._id
  );


  const userData = await User.findById(prevUser._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(
      new ApiResponse(200, "success", {
        user: userData,
        token: accessToken,
        refreshToken,
      })
    );
});
