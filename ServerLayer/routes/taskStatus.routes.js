
module.exports = app => {
    const statusController = require("../controllers/taskStatus.controller.js");

    const router = require("express").Router();

    // Add status
    router.post("/add", statusController.add);

    // Delete status
    router.delete("/:id", statusController.delete);

    // All statuses
    router.get("/all", statusController.findAll);

    // Fetch status
    router.get("/:id", statusController.findOne)

    app.use('/api/task_status', router);
};
