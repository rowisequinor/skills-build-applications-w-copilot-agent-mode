import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    rank: { type: Number, required: true, unique: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    totalMinutes: { type: Number, required: true },
    totalCalories: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);