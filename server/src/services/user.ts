import { IUser } from "../types";
import UserModel from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jsiow82ka";

export const registerUser = async (
  { firstName, lastName, email, password, image }: IUser,
) => {
  if (password) {
    const userExists = await UserModel.findOne({ email });
    if (userExists) throw new Error("User already exists");
    const passwordHash = await bcryptjs.hash(password, 10);
    await UserModel.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
  } else {
		const userExists = await UserModel.findOne({ email });
    if (userExists) throw new Error("User already exists");
    const userData = await UserModel.create({
      firstName,
      lastName,
      email,
      image,
    });		
    return { userData };
  }

  return "User created successfully";
};

export const loginUser = async ({ email, password }: IUser) => {
  const userExists = await UserModel.findOne({ email });
  if (!userExists) throw new Error("Email or Password is wrong");

  if (userExists.password) {
    const verifyPassword = await bcryptjs.compare(
      password,
      userExists.password
    );
    if (!verifyPassword) throw new Error("Incorrect password");
  }

  const token: string = jwt.sign({ _id: userExists._id }, JWT_SECRET, {
    expiresIn: "2h",
  });

  return { token, user: userExists };
};
