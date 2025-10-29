import type { RequestHandler } from "express";
import { User } from "#models";

export const getAllUsers: RequestHandler = async (req, res) => {
  const allUsers = await User.find();
  console.log("getAllUsers");
  if (allUsers.length === 0) {
    //    res.json({ message: allUsers });
    return res.status(417).json({ message: "No users found" });
  }
  return res.json({ message: allUsers });
};

export const registerUser: RequestHandler = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  //const chkEmail = await User.find({ email: email });
  const chkEmail = await User.findOne({ email: email });
  console.log(`firstName: ${chkEmail}`);
  if (chkEmail) {
    return res.status(418).json({ message: "this email is always in use!" });
  }

  const regUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  return res.json({ message: "User created" });
};

export const updateUser: RequestHandler = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(
    { id: id },
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
    { new: true, runValidators: true }
  );
  if (!updatedUser) {
    return res.status(331).json({ message: "Not found!" });
  }
  return res.json({ message: "User updated" });
};
