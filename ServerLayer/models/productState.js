
module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const stateSchema = new Schema({
        name: String,
        key: String,
        products: [{
            type: Schema.Types.ObjectId,
            ref: "Product",
        }]
    })

    stateSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("ProductState", stateSchema);
};

