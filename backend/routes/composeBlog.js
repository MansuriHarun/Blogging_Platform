const router = require("express").Router();
const Blog = require("../models/Blog");
const UserModel = require("../models/signup");

// Compose BLog Route
router.post("/compose", async (req, res) => {
    try {
        const { title, description } = req.body;
        
        if (!title || !description) {
            return res.status(422).json({ error: "Fill the required fields" });
        }

        const UserId = sessionStorage.getItem("UserId");
        const user = await UserModel.findById(UserId);
            if (user) {
            const newBlog = new Blog({ title, description, author: UserId });
            await newBlog.save();
            return res.status(201).json({ message: "Blog post created successfully" });
            }
            else{
                return res.status(401).json({message: "You must be logged in"});
            }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create blog post" });
    }
});

// Check Cookies Route
router.get("/checksession", (req, res) => {
    const UserId = sessionStorage.getItem("UserId");
    if(UserId) {
        res.send("Session Storage is available");
    }
    else{
        res.send("Session Storage is not available");
    }
})

module.exports = router;
