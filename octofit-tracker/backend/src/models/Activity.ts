import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Activity || mongoose.model('Activity', activitySchema);