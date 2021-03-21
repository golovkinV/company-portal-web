
module.exports = app => {
    const productController = require("../controllers/product.controller.js");

    const router = require("express").Router();

    // Add job
    router.post("/add", productController.add);

    // Delete job
    router.delete("/:id", productController.delete);

    // All job
    router.get("/all", productController.findAll);

    // Fetch job
    router.get("/:id", productController.findOne)

    app.use('/api/product', router);
};
