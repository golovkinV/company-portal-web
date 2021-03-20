
const db = require("../index")
const Reward = db.reward

// All rewards
exports.findAll = (req, res) => {
    Reward.find()
        .populate("users")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Some error occurred while retrieving Reward" });
        });
};

// Add reward
exports.add = (req, res) => {
    const rewardParams = req.body
    const reward = new Reward({
        name: rewardParams.name,
        desc: rewardParams.desc,
        icon: rewardParams.icon
    })

    reward.save(reward)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating the Reward"
                });
        });
};

// Delete role
exports.delete = (req, res) => {
    const id = req.params.id;
    Reward.findByIdAndRemove(id)
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Cannot delete Reward with id=${id}` });
            else
                res.send(data);

        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Could not delete Reward with id=${id}`});
        });
};

// Fetch role
exports.findOne = (req, res) => {
    const id = req.params.id;
    Reward.findById(id)
        .populate("users")
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Not found Reward with id=${id}` });
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving Reward with id=${id}` });
        });
};