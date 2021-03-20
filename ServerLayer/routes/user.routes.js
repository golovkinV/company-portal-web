
module.exports = app => {
    const userController = require("../controllers/user.controller");

    const router = require("express").Router();

    // Register user
    router.post("/", userController.register);

    // Login user
    router.post("/login", userController.login);

    // All users
    router.get("/all", userController.findAll);

    // Update user
    router.put("/:id", userController.update)

    // Fetch user
    router.get("/:id", userController.findOne);

    app.use('/api/user', router);
};
