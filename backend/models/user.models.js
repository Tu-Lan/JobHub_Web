import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['student', 'recruiter'],
    required: true
  },
  profile: {
    bio: { type: String },
    skills: [{ type: String }],
    resume: { type: String },
    resumeOriginalName: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },  // Corrected reference
    profilePhoto: {
      type: String,
      default: "",
    },
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
