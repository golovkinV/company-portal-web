
module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const jobSchema = new Schema({
        name: String,
        users: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    })

    jobSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("Job", jobSchema);
};