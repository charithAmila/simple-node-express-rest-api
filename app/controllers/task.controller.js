const Task = require("../models/task.model.js");

exports.create = (req, res) => {
  const task = new Task({
    title: req.body.title || "Untitled Task",
    status: req.body.status || "Status is required"
  });

  task
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task."
      });
    });
};

exports.findAll = (req, res) => {
  Task.find()
    .then(tasks => {
      res.send(tasks);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks."
      });
    });
};

exports.findOne = (req, res) => {
  Task.findById(req.params.taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      res.send(task);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      return res.status(500).send({
        message: "Error retrieving task with id " + req.params.taskId
      });
    });
};

exports.update = (req, res) => {
  Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
    .then(task => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      res.send(task);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      return res.status(500).send({
        message: "Error updating task with id " + req.params.taskId
      });
    });
};

exports.delete = (req, res) => {
  Task.findByIdAndRemove(req.params.taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      res.send({ message: "Task deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      return res.status(500).send({
        message: "Could not delete task with id " + req.params.taskId
      });
    });
};

exports.updateMany = (req, res) => {
  Task.updateMany({}, { $set: { status: req.body.status } })
    .then(tasks => {
      if (!tasks) {
        return res.status(404).send({
          message: "Error updating tasks"
        });
      }
      res.send(tasks);
    })
    .catch(e => {
      return res.status(500).send({
        message: "Error updating tasks"
      });
    });
};
