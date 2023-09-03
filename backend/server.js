const express = require("express");
const connectDatabase = require("./config/database");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: [
            "https://harun-blog-website.netlify.app",
        ],
        credentials: true,
    }));
app.use(compression());
app.use(cookieParser());


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
