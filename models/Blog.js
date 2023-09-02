const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date().toString()
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "UserModel",
    }
});

module.exports = new mongoose.model("Blog", blogSchema);