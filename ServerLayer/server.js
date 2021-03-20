const express = require("express");
const bodyParser = require("body-parser");
// const fileUpload = require('express-fileupload');
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./index");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Requests routes
require("./routes/job.routes.js")(app);
require("./routes/reward.routes.js")(app);
require("./routes/shopStatus.routes.js")(app);
require("./routes/user.routes.js")(app);