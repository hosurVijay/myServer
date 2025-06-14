import { asyncHandler } from "../Utilis/AsyncHandler";
import { ApiError } from "../Utilis/ApiError.js";
import { use, useReducer } from "react";
import { User } from "../Models/user.models";
import { ApiResponse } from "../Utilis/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;
  const checkEmptyFields = [username, fullName, email, password].map(
    (each) => !each?.trim()
  );

  if (checkEmptyFields.includes(true)) {
    throw new ApiError(500, "All fields are required!!");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(500, "User already exist");
  }

  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(
      401,
      "something went wrong while Registering!! \n Please try again after some time!!"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "userCreated successfully!!", { user }));
});

export { registerUser };
