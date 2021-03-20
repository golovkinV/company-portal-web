
module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
        login: String,
        password: String,
        firstName: String,
        lastName: String,
        createdAt: Date,
        avatar: String,
        money: Number,
        orders: [{
            type: Schema.Types.ObjectId,
            ref: "Order"
        }],
        rewards: [{
            type: Schema.Types.ObjectId,
            ref: "Reward"
        }],
        tasks: [{
            type: Schema.Types.ObjectId,
            ref: "Task"
        }],
        job: {
            type: Schema.Types.ObjectId,
            ref: "Job"
        },
        shopStatus: {
            type: Schema.Types.ObjectId,
            ref: "ShopStatus"
        }
    }, { timestamps: true })

    userSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("User", userSchema);
};