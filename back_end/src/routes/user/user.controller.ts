import { Request, Response } from "express";
import User from "../../models/user.model";  
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userSchema } from "./user.validation";
import z from "zod";

interface RegisterUserBody {
  userName: string;
  userEmail: string;
  password: string;
  role: string;
}

interface LoginUserBody {
  userEmail: string;
  password: string;
}

const registerUser = async (req: Request<{}, {}, RegisterUserBody>, res: Response) => {
  try{
  const validData = userSchema.parse(req.body)
  const { userName, userEmail, password, role } = validData;

  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User name or user email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully!",
  });
}catch(e){
    if (e instanceof z.ZodError) {  
        console.error(e.errors);  
        return res.status(400).json({
          success: false,
          errors: e.errors,
        });
      } else {
        console.error("An unexpected error occurred:", e);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
};} 

const loginUser = async (req: Request<{}, {}, LoginUserBody>, res: Response) => {
  const { userEmail, password } = req.body;

  const checkUser = await User.findOne({ userEmail });

  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    "JWT_SECRET",
    { expiresIn: "120m" }
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
    },
  });
};

export { registerUser, loginUser };