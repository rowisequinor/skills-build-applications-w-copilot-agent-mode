import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    role: { type: String, required: true },
    teamName: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model('User', userSchema);