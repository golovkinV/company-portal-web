
module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const statusSchema = new Schema({
        name: String,
        key: String,
        tasks: [{
            type: Schema.Types.ObjectId,
            ref: "Task",
        }]
    })

    statusSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("TaskStatus", statusSchema);
};
