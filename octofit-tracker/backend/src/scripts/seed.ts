import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Team.insertMany([
      {
        name: 'Octo Striders',
        mascot: 'Stridey',
        city: 'Seattle',
        members: ['Mona Rivers', 'Jordan Kim'],
        weeklyGoalMinutes: 900,
      },
      {
        name: 'Core Crushers',
        mascot: 'Crunch',
        city: 'Austin',
        members: ['Priya Patel', 'Elliot Chen'],
        weeklyGoalMinutes: 750,
      },
      {
        name: 'Trail Blazers',
        mascot: 'Summit',
        city: 'Denver',
        members: ['Sam Taylor'],
        weeklyGoalMinutes: 600,
      },
    ]);

    await User.insertMany([
      {
        username: 'mrivers',
        email: 'mona.rivers@example.com',
        displayName: 'Mona Rivers',
        role: 'team_captain',
        teamName: 'Octo Striders',
        fitnessGoal: 'Run a sub-50 minute 10K',
      },
      {
        username: 'jkim',
        email: 'jordan.kim@example.com',
        displayName: 'Jordan Kim',
        role: 'member',
        teamName: 'Octo Striders',
        fitnessGoal: 'Build weekly cardio consistency',
      },
      {
        username: 'ppatel',
        email: 'priya.patel@example.com',
        displayName: 'Priya Patel',
        role: 'team_captain',
        teamName: 'Core Crushers',
        fitnessGoal: 'Improve core strength and mobility',
      },
      {
        username: 'echen',
        email: 'elliot.chen@example.com',
        displayName: 'Elliot Chen',
        role: 'member',
        teamName: 'Core Crushers',
        fitnessGoal: 'Increase strength training volume',
      },
      {
        username: 'staylor',
        email: 'sam.taylor@example.com',
        displayName: 'Sam Taylor',
        role: 'member',
        teamName: 'Trail Blazers',
        fitnessGoal: 'Prepare for a spring trail race',
      },
    ]);

    await Activity.insertMany([
      {
        userName: 'Mona Rivers',
        teamName: 'Octo Striders',
        type: 'Run',
        durationMinutes: 48,
        caloriesBurned: 510,
        activityDate: new Date('2026-07-27T07:30:00Z'),
      },
      {
        userName: 'Jordan Kim',
        teamName: 'Octo Striders',
        type: 'Cycling',
        durationMinutes: 62,
        caloriesBurned: 640,
        activityDate: new Date('2026-07-28T18:15:00Z'),
      },
      {
        userName: 'Priya Patel',
        teamName: 'Core Crushers',
        type: 'Pilates',
        durationMinutes: 40,
        caloriesBurned: 230,
        activityDate: new Date('2026-07-29T12:00:00Z'),
      },
      {
        userName: 'Elliot Chen',
        teamName: 'Core Crushers',
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 420,
        activityDate: new Date('2026-07-30T16:45:00Z'),
      },
      {
        userName: 'Sam Taylor',
        teamName: 'Trail Blazers',
        type: 'Trail Run',
        durationMinutes: 74,
        caloriesBurned: 780,
        activityDate: new Date('2026-07-31T06:45:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        rank: 1,
        userName: 'Sam Taylor',
        teamName: 'Trail Blazers',
        totalMinutes: 310,
        totalCalories: 3220,
      },
      {
        rank: 2,
        userName: 'Jordan Kim',
        teamName: 'Octo Striders',
        totalMinutes: 285,
        totalCalories: 2890,
      },
      {
        rank: 3,
        userName: 'Mona Rivers',
        teamName: 'Octo Striders',
        totalMinutes: 260,
        totalCalories: 2640,
      },
      {
        rank: 4,
        userName: 'Elliot Chen',
        teamName: 'Core Crushers',
        totalMinutes: 240,
        totalCalories: 2050,
      },
      {
        rank: 5,
        userName: 'Priya Patel',
        teamName: 'Core Crushers',
        totalMinutes: 215,
        totalCalories: 1510,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo 10K Builder',
        focusArea: 'Cardio',
        difficulty: 'Intermediate',
        estimatedMinutes: 45,
        exercises: ['10 minute warmup jog', '24 minute tempo run', '6 hill strides', '5 minute cooldown'],
        recommendedFor: 'Runners improving pace control',
      },
      {
        title: 'Core Stability Circuit',
        focusArea: 'Core',
        difficulty: 'Beginner',
        estimatedMinutes: 30,
        exercises: ['Dead bugs', 'Side planks', 'Glute bridges', 'Bird dogs'],
        recommendedFor: 'Members building foundational strength',
      },
      {
        title: 'Trail Climb Intervals',
        focusArea: 'Endurance',
        difficulty: 'Advanced',
        estimatedMinutes: 60,
        exercises: ['Dynamic warmup', '8 uphill intervals', 'Technical downhill practice', 'Mobility cooldown'],
        recommendedFor: 'Trail runners preparing for elevation gain',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
