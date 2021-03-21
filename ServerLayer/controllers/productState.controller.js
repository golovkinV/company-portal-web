const db = require("../index")
const ProductState = db.productState
const Product = db.product
const noStateId = "6056ef0e15ec5660bcfa499d"

// All states
exports.findAll = (req, res) => {
    ProductState.find()
        .populate("products")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Some error occurred while retrieving Product State" });
        });
};

// Add state
exports.add = (req, res) => {
    const stateParams = req.body
    const state = new ProductState({
        name: stateParams.name,
        key: stateParams.key
    })

    state.save(state)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating the Product State"
                });
        });
};

// Delete state
exports.delete = (req, res) => {
    const id = req.params.id;
    ProductState.findByIdAndRemove(id)
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Cannot delete Product State with id=${id}` });
            else {
                ProductState.findByIdAndUpdate(noStateId, { $addToSet: { products: data.products } }, { useFindAndModify: false })
                    .then(resp => {
                        Product.updateMany(
                            { _id: { $in: data.products } },
                            { $set: { state: noStateId } },
                            { multi: true })
                            .then(resp => {

                            })
                            .catch(err => {
                                res
                                    .status(500)
                                    .send({
                                        message: err.message || "Some error occurred while removing the Product State in Product"
                                    });
                            })
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .send({ message: `Error retrieving Product State with id=${noStateId}` });
                    });
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Could not delete Product State with id=${id}`});
        });
};

// Fetch state
exports.findOne = (req, res) => {
    const id = req.params.id;
    ProductState.findById(id)
        .populate("products")
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Not found Product State with id=${id}` });
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving Product State with id=${id}` });
        });
};
