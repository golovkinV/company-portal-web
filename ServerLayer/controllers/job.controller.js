
const db = require("../index")
const Job = db.job

// All jobs
exports.findAll = (req, res) => {
    Job.find()
        .populate("users")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Some error occurred while retrieving Job" });
        });
};

// Add job
exports.add = (req, res) => {
    const jobParams = req.body
    const job = new Job({
        name: jobParams.name
    })

    job.save(job)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating the Job"
                });
        });
};

// Delete job
exports.delete = (req, res) => {
    const id = req.params.id;
    Job.findByIdAndRemove(id)
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Cannot delete Job with id=${id}` });
            else
                res.send(data);

        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Could not delete Job with id=${id}`});
        });
};

// Fetch job
exports.findOne = (req, res) => {
    const id = req.params.id;
    Job.findById(id)
        .populate("users")
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Not found Job with id=${id}` });
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving Job with id=${id}` });
        });
};