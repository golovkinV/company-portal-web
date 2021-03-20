
const db = require("../index")
const Task = db.task
const User = db.user
const toDoId = "60563e9bb413474d20cb287c"

// All tasks
exports.findAll = (req, res) => {
    Task.find()
        .populate("users")
        .populate("status")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Some error occurred while retrieving Task" });
        });
};

// Add task
exports.add = (req, res) => {
    const taskParams = req.body
    const users = taskParams.users
    const task = new Task({
        name: taskParams.name,
        desc: taskParams.desc,
        startDate: taskParams.startDate,
        endDate: taskParams.endDate,
        money: taskParams.money,
        status: toDoId,
        users: users
    })

    task.save(task)
        .then(data => {
            User.updateMany(
                { _id: { $in: users }},
                { $addToSet: { tasks: [data.id] } },
                { multi: true })
                .then(resp => {})
                .catch(err => {
                    res
                        .status(500)
                        .send({
                            message: err.message || "Some error occurred while adding the Task for Users"
                        });
                })
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating the Task"
                });
        });
};

// Delete task
exports.delete = (req, res) => {
    const id = req.params.id;
    Task.findByIdAndRemove(id)
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Cannot delete Task with id=${id}` });
            else {
                User.updateMany(
                    { _id: { $in: data.users }},
                    { $pull: { tasks: data.id } },
                    { multi: true })
                    .then(resp => {})
                    .catch(err => {
                        res
                            .status(500)
                            .send({
                                message: err.message || "Some error occurred while removing the Task for Users"
                            });
                    })
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Could not delete Task with id=${id}`});
        });
};

// Fetch Task
exports.findOne = (req, res) => {
    const id = req.params.id;
    Task.findById(id)
        .populate("users")
        .populate("status")
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Not found Task with id=${id}` });
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving Task with id=${id}` });
        });
};