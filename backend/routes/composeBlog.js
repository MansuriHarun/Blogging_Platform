const router = require("express").Router();
const Blog = require("../models/Blog");
const UserModel = require("../models/signup");
const jwt = require("jsonwebtoken");

// Compose BLog Route
router.post("/compose", async (req, res) => {
    try {
        const { title, description } = req.body;
        
        if (!title || !description) {
            return res.status(422).json({ error: "Fill the required fields" });
        }
        const {UserId} = req.cookies;
        if(UserId) {
            const decodedToken = jwt.verify(UserId, process.env.SECRET_KEY);
            const userId = decodedToken._id;

            const user = await UserModel.findById(userId);
        
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            const newBlog = new Blog({ title, description, author: userId });
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
router.get("/checkCookies", (req, res) => {
    const {UserId} = req.cookies;
    if(UserId) {
        res.send("Cookies are available");
    }
    else{
        res.send("No cookies available");
    }
})

module.exports = router;