const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database is Connected");
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = connectDatabase;