import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/clouddinary.js";

// Register
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    };

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto: cloudResponse.secure_url,
      }
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Incorrect role",
        success: false
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res.status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict'
      })
      .json({
        message: `Welcome ${user.fullName}`,
        user: userResponse,
        success: true
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    if (!fullName && !email && !phoneNumber && !bio && !skills && !req.file) {
      return res.status(400).json({
        message: "No fields provided for update",
        success: false
      });
    }

    const file = req.file;
    let fileUrl = null; // Change from req.fileUrl to fileUrl
    if (file) {
      try {
        const fileUri = getDataUri(file); // Convert file to Data URI
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
          fetch_format: 'auto',
          // resource_type: 'auto'  Ensure the file is uploaded as a raw file
        });
        fileUrl = cloudResponse.secure_url; // Store URL for the uploaded file
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({
          message: "Failed to upload file",
          success: false
        });
      }
    }

    const userId = req.id; // Assuming `req.id` is set by middleware/auth
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false
      });
    }

    // Update user fields only if they are provided in the request
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map(skill => skill.trim());
    if (fileUrl) {
      user.profile.resume = fileUrl;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
