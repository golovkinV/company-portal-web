
const db = require("../index")
const Status = db.shopStatus

// All statuses
exports.findAll = (req, res) => {
    Status.find()
        .populate("users")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Some error occurred while retrieving Status" });
        });
};

// Add status
exports.add = (req, res) => {
    const statusParams = req.body
    const status = new Status({
        name: statusParams.name,
        sale: statusParams.sale
    })

    status.save(status)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating the Status"
                });
        });
};

// Delete status
exports.delete = (req, res) => {
    const id = req.params.id;
    Status.findByIdAndRemove(id)
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Cannot delete Status with id=${id}` });
            else
                res.send(data);

        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Could not delete Status with id=${id}`});
        });
};

// Fetch status
exports.findOne = (req, res) => {
    const id = req.params.id;
    Status.findById(id)
        .populate("users")
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Not found Status with id=${id}` });
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving Status with id=${id}` });
        });
};