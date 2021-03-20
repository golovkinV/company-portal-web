
module.exports = app => {
    const jobController = require("../controllers/job.controller.js");

    const router = require("express").Router();

    // Add job
    router.post("/add", jobController.add);

    // Delete job
    router.delete("/:id", jobController.delete);

    // All job
    router.get("/all", jobController.findAll);

    // Fetch job
    router.get("/:id", jobController.findOne)

    app.use('/api/job', router);
};
