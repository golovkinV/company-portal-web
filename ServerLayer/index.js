const dbConfig = require("./config/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// db.user = require("./models/user.js")(mongoose);
// db.role = require("./models/role.js")(mongoose);
// db.event = require("./models/event.js")(mongoose);
// db.document = require("./models/document")(mongoose);

module.exports = db;