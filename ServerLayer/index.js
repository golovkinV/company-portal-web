const dbConfig = require("./config/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.user = require("./models/user.js")(mongoose);
db.job = require("./models/job.js")(mongoose);
db.reward = require("./models/reward.js")(mongoose);
db.shopStatus = require("./models/shopStatus.js")(mongoose);
db.taskStatus = require("./models/taskStatus.js")(mongoose);
db.task = require("./models/task.js")(mongoose);
db.productState = require("./models/productState.js")(mongoose);
db.product = require("./models/product.js")(mongoose);

module.exports = db;