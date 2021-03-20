
module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const productSchema = new Schema({
        name: String,
        desc: String,
        cost: Number,
        image: String,
        state: {
            type: Schema.Types.ObjectId,
            ref: "ProductState",
        }
    })

    productSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("Product", productSchema);
};
