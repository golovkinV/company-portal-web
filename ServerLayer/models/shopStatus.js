
module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const statusSchema = new Schema({
        name: String,
        sale: Number,
        users: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    })

    statusSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("ShopStatus", statusSchema);
};
