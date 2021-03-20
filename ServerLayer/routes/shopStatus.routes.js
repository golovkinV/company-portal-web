
module.exports = app => {
    const statusController = require("../controllers/shopStatus.controller.js");

    const router = require("express").Router();

    // Add status
    router.post("/add", statusController.add);

    // Delete status
    router.delete("/:id", statusController.delete);

    // All status
    router.get("/all", statusController.findAll);

    // Fetch status
    router.get("/:id", statusController.findOne)

    app.use('/api/shop_status', router);
};
