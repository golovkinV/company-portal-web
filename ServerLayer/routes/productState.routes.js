
module.exports = app => {
    const stateController = require("../controllers/productState.controller.js");

    const router = require("express").Router();

    // Add status
    router.post("/add", stateController.add);

    // Delete status
    router.delete("/:id", stateController.delete);

    // All statuses
    router.get("/all", stateController.findAll);

    // Fetch status
    router.get("/:id", stateController.findOne)

    app.use('/api/product_state', router);
};
