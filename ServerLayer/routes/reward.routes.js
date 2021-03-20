
module.exports = app => {
    const rewardController = require("../controllers/reward.controller.js");

    const router = require("express").Router();

    // Add reward
    router.post("/add", rewardController.add);

    // Delete reward
    router.delete("/:id", rewardController.delete);

    // All reward
    router.get("/all", rewardController.findAll);

    // Fetch reward
    router.get("/:id", rewardController.findOne)

    app.use('/api/reward', router);
};
