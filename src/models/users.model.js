import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      required: true,
    },
    mobile: {
      type: "Number",
      required: true,
    },
    password: {
      type: "String",
      required: [true, "Password is required"],
    },
    accessToken: {
      type: "String",
    },
    refreshToken: {
      type: "String",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User = model("User", userSchema);
