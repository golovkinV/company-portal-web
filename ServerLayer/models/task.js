
module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const taskSchema = new Schema({
        name: String,
        desc: String,
        startDate: String,
        endDate: String,
        money: Number,
        status: {
            type: Schema.Types.ObjectId,
            ref: "TaskStatus",
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    })

    taskSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("Task", taskSchema);
};
