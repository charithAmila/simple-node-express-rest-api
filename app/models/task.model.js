const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    title: String,
    status: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Task", TaskSchema);
