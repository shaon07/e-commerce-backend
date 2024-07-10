import expressAsyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

export const verifyJWT = expressAsyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json(new ApiResponse(401, "Unauthorized"));
  }

  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!user) {
    return res.status(403).json(new ApiResponse(403, "Forbidden"));
  }
  req.user = user;

  next();
});
