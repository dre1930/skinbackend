import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    

    user = new User({ email, name, password:hashedPassword });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email,password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

     const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

     
    const token = jwt.sign({ id: user._id, role:user.role }, 
      process.env.JWT_SECRET,
      
    );

    res.json({
      msg: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email , role: user.role},
    });

  

    
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ msg: "User profile", user: req.user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
