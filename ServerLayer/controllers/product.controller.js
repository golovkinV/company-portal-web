
const db = require("../index")
const Product = db.product
const ProductState = db.productState

// All products
exports.findAll = (req, res) => {
    Product.find()
        .populate("state")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Some error occurred while retrieving Product" });
        });
};

// Add product
exports.add = (req, res) => {
    const productParams = req.body
    const stateId = productParams.state
    const product = new Product({
        name: productParams.name,
        desc: productParams.desc,
        cost: productParams.cost,
        image: productParams.image,
        state: stateId
    })

    product.save(product)
        .then(data => {
            ProductState.findByIdAndUpdate(stateId, { $addToSet: { products: [data.id] } }, { useFindAndModify: false })
                .then(data => {})
                .catch(err => {
                    res
                        .status(500)
                        .send({ message: `Error retrieving Product State with id=${stateId}` });
                });

            res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating the Product"
                });
        });
};

// Delete product
exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id)
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Cannot delete Product with id=${id}` });
            else {
                ProductState.updateOne(
                    { _id: data.stat },
                    { $pull: { products: id }})
                    .then(resp => {})
                    .catch(err => {
                        res
                            .status(500)
                            .send({
                                message: err.message || "Some error occurred while removing the Product in Product State"
                            });
                    })
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Could not delete Product with id=${id}`});
        });
};

// Fetch product
exports.findOne = (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .populate("state")
        .then(data => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `Not found Product with id=${id}` });
            else
                res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retrieving Product with id=${id}` });
        });
};