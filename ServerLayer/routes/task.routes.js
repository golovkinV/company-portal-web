
module.exports = app => {
    const taskController = require("../controllers/task.controller.js");

    const router = require("express").Router();

    // Add task
    router.post("/add", taskController.add);

    // Delete task
    router.delete("/:id", taskController.delete);

    // All task
    router.get("/all", taskController.findAll);

    // Delete users
    router.put("/delete_users/:id", taskController.deleteUsers)

    // Update task
    router.put("/:id", taskController.update)

    // Fetch task
    router.get("/:id", taskController.findOne)

    // Fetch user tasks
    router.get("/user/:id", taskController.userTasks)
    
    app.use('/api/task', router);
};
