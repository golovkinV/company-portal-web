
module.exports = app => {
    const taskController = require("../controllers/task.controller.js");

    const router = require("express").Router();

    // Add task
    router.post("/add", taskController.add);

    // Delete task
    router.delete("/:id", taskController.delete);

    // All task
    router.get("/all", taskController.findAll);

    // Fetch task
    router.get("/:id", taskController.findOne)

    app.use('/api/task', router);
};
