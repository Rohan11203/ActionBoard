import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  avtar: { type: String },
  notifications: [
    {
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
      message: { type: String },
      status: {
        type: String,
        enum: ["read", "unread"],
        default: "unread",
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["to-do", "in-progress", "completed"],
    default: "to-do",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: { type: Date },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedTo: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      assignedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model('User', userSchema);
export const TaskModel = mongoose.model('Task', taskSchema);

