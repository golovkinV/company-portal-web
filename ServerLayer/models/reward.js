
module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const rewardSchema = new Schema({
        name: String,
        desc: String,
        icon: String,
        users: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    })

    rewardSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("Reward", rewardSchema);
};