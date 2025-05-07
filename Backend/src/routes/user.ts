import { Router } from "express";
import { UserModel } from "../db/db";
import { validateUserData } from "../zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Userauth } from "../auth/auth";
import RandomAvtar from "../lib/randomAvtar";
const UserRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET!;

UserRouter.get("/search",Userauth, async (req:any,res:any) => {
  try{
    const keyword = req.query.search
  ?
  {
    $or: [
      { username: { $regex:req.query.search, $options: "i" } },
      { email: { $regex:req.query.search, $options: "i" } }
    ]
  }:{}

  console.log(keyword);

  const users = await UserModel.find(keyword).find({ _id:{ $ne: req.user._id } })   
  res.status(200).json(users);

  }
  catch(e){
    res.json({
      message: "Error while fetching user from search"
    })
  }

})

UserRouter.post("/signup", async (req: any, res: any) => {
  // Validation
  const parsed = validateUserData.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.errors.map((e) => e.message),
    });
  }

  const { username, email, password } = parsed.data;

  try {
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const avtar = RandomAvtar();
    console.log(avtar);
    const user = await UserModel.create({ username, email, password: hash, avtar:avtar });

    return res.status(201).json({
      success: true,
      message: "Signup sucessfull",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/v1/auth/signin
UserRouter.post("/signin", async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { sub: user._id.toString(), email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    console.log("here")
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: false,
        secure: false, // Needed for HTTPS (Render uses HTTPS)
        sameSite: "lax",
      })
      .json({
        success: true,
        message: "Login successful",
        token,
        user: { id: user._id, username: user.username, email: user.email },
      });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

UserRouter.post("/logout", Userauth, async (req:any, res:any) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err:any) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
});

UserRouter.get("/profile", Userauth, async (req: any, res: any) => {
  try {
    const email = req.user.email;
    const userDoc = await UserModel.findOne({ email }).select("-password");

    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userDoc);
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default UserRouter;
