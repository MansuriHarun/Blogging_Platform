const express = require("express");
const connectDatabase = require("./config/database");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");
const app = express();


dotenv.config();

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception")
    process.exit(1);
});

// Database configuration
connectDatabase();


// Middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

// Routes
app.use(require("./routes/composeBlog"));
app.use(require("./routes/blogs"));
app.use(require("./routes/index"));
app.use(require("./routes/user"));


process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
})


// Listening Port
app.listen(process.env.PORT, () => {
    console.log(`Server is Listening on port ${process.env.PORT}`);
});
