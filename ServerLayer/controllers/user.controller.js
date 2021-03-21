
const db = require("../index");
const hash = require("password-hash")
const User = db.user;
const Job = db.job
const Reward = db.reward
const ShopStatus = db.shopStatus
const noJobId = "6055cf93a8be403241264252"
const firstRewardId = "6055d119a8be403241264253"
const firstShopStatusId = "6055d9df915fa336f74faba6"

// Fetch user
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .populate("rewards")
        .populate("tasks")
        .populate("job")
        .populate("shopStatus")
        .then(data => {
            if (!data)
                res.status(404).send({ message: `Not found User with id=${id}` });
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving User with id=${id}` });
        });
};

// Fetch users
exports.findAll = (req, res) => {
    User.find()
        .populate("rewards")
        .populate("tasks")
        .populate("job")
        .populate("shopStatus")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users"
            });
        });
};

// Register User
exports.register = (req, res) => {
    const userParams = req.body;
    const jobId = userParams.job
    const user = new User({
        login: userParams.login,
        password: hash.generate(userParams.password),
        firstName: userParams.firstName,
        lastName: userParams.lastName,
        avatar: userParams.avatar,
        job: jobId,
        rewards: [firstRewardId],
        shopStatus: firstShopStatusId
    });

    user.save(user)
        .then(data => {
            Job.findByIdAndUpdate(jobId, { $addToSet: { users: [data.id] } }, { useFindAndModify: false })
                .then(data => {})
                .catch(err => {
                    res
                        .status(500)
                        .send({ message: `Error retrieving Job with id=${jobId}` });
                });

            Reward.findByIdAndUpdate(firstRewardId, { $addToSet: { users: [data.id] } }, { useFindAndModify: false })
                .then(data => {})
                .catch(err => {
                    res
                        .status(500)
                        .send({ message: `Error retrieving Reward with id=${firstRewardId}` });
                });

            ShopStatus.findByIdAndUpdate(firstShopStatusId, { $addToSet: { users: [data.id] } }, { useFindAndModify: false })
                .then(data => {})
                .catch(err => {
                    res
                        .status(500)
                        .send({ message: `Error retrieving Shop Status with id=${firstShopStatusId}` });
                });

            res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating the User"
                });
        });
};

// Update user
exports.update = (req, res) => {
    const id = req.params.id;
    const user = req.body

    const currentJob = user.currentJob
    const currentShopStatus = user.currentShopStatus

    const newJob = user.job
    const newShopStatus = user.shopStatus

    User.findByIdAndUpdate(id, user, { useFindAndModify: false })
        .then(data => {
            if (!!newJob && newJob !== currentJob) {
                Job.findByIdAndUpdate(newJob, { $addToSet: { users: [data.id] } }, { useFindAndModify: false })
                    .then(resp => {
                        Job.findByIdAndUpdate(currentJob, { $pull: { users: data.id } }, { useFindAndModify: false })
                            .then(resp => {
                                data.job = newJob
                            })
                            .catch(err => {
                                res
                                    .status(500)
                                    .send({
                                        message: err.message || "Some error occurred while updating the Job"
                                    });
                            });
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .send({
                                message: err.message || "Some error occurred while updating the Job"
                            });
                    });
            }

            if (!!newShopStatus && newShopStatus !== currentShopStatus) {
                ShopStatus.findByIdAndUpdate(newShopStatus, { $addToSet: { users: [data.id] } }, { useFindAndModify: false })
                    .then(resp => {
                        ShopStatus.findByIdAndUpdate(currentShopStatus, { $pull: { users: data.id } }, { useFindAndModify: false })
                            .then(resp => {
                                data.shopStatus = newShopStatus
                            })
                            .catch(err => {
                                res
                                    .status(500)
                                    .send({
                                        message: err.message || "Some error occurred while updating the Shop Status"
                                    });
                            });
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .send({
                                message: err.message || "Some error occurred while updating the Shop Status"
                            });
                    });
            }

            res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error updating User with id=${id}` });
        });
}

// Login User
exports.login = (req, res) => {
    const user = req.body
    const login = user.login
    const password = user.password
    User.findOne({ login: login })
        .populate("rewards")
        .populate("tasks")
        .populate("job")
        .populate("shopStatus")
        .then(data => {
            if (!data || !hash.verify(password, data.password)) {
                res
                    .status(404)
                    .send({ message: 'Wrong email or password' })
            }
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving User with login=${login}` });
        });
}
