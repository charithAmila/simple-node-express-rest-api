module.exports = app => {
  const tasks = require("../controllers/task.controller.js");

  // Create a new Task
  app.post("/tasks", tasks.create);

  // Retrieve all tasks
  app.get("/tasks", tasks.findAll);

  // Retrieve a single Task with taskId
  app.get("/tasks/:taskId", tasks.findOne);

  // Update a Task with taskId
  app.patch("/tasks/:taskId", tasks.update);

  // Update all Task
  app.put("/tasks", tasks.updateMany);

  // Delete a Task with taskId
  app.delete("/tasks/:taskId", tasks.delete);
};
