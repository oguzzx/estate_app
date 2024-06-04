import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // CREATE A NEW USER AND SAVE TO DB
    const user = await User.create({
      id: Math.floor(Math.random() * 1000000000),
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("no user registered");
    }

    // check if password is correct
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(400).send("wrong password");
    }

    const age = 1000 * 60 * 60 * 24 * 7; // 7 days

    // generate token
    const token = jwt.sign(
      { id: user.id, username: user.username,isAdmin:false },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );

    // generate cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: age,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).send("Logged out");
};
