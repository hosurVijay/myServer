import { asyncHandler } from "../Utilis/AsyncHandler.js";
import { ApiError } from "../Utilis/ApiError.js";
import { User } from "../Models/user.models.js";
import { ApiResponse } from "../Utilis/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;
  const checkEmptyFields = [username, fullName, email, password].map(
    (each) => !each?.trim()
  );

  if (checkEmptyFields.includes(true)) {
    throw new ApiError(400, "All fields are required!!");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exist.");
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
      500,
      "something went wrong while Registering!! \n Please try again after some time!!"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "userCreated successfully.", { createdUser }));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Username or email is required.");
  }
  const findUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!findUser) {
    throw new ApiError(401, "No user with such emailID or Username found!!");
  }

  const checkPassword = await findUser.isPasswordCorrect(password);
  if (!checkPassword) {
    throw new ApiError(401, "Password incorrect please try again!!");
  }
  const foundUser = await User.findById(findUser._id).select("-password");

  res
    .status(200)
    .json(new ApiResponse(200, "Logged In successfully.", { foundUser }));
});

const logoutUser = asyncHandler(async (req, res) => {
  // NOTE: No JWT or session logic is implemented yet.
  // This logout is currently handled entirely on the frontend by clearing user state.
  // In the future, when JWT authentication is added, this endpoint will be updated
  // to clear the authentication token (e.g., httpOnly cookie). Stay tuned!
  res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully.", {}));
});

export { registerUser, loginUser, logoutUser };
