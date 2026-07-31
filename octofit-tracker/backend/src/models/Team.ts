import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    city: { type: String, required: true },
    members: [{ type: String, required: true }],
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Team || mongoose.model('Team', teamSchema);