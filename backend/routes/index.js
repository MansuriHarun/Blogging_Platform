const router = require("express").Router();
const Blog = require("../models/Blog");

router.get("/", (req, res) => {
    res.send("Hello World");
})

router.get("/blog/:id", async (req, res) => {
    const {id} = req.params;
    const getBlog = await Blog.findById(id);
    res.send(getBlog);
}).delete("/delete/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const getBlog = await Blog.findById(id);

        if (!getBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const UserId = sessionStorage.getItem("UserId");
        if (UserId) {
            // Check if the user's ID matches the author's ID of the blog
            if (getBlog.author.toString() === userId) {
                await Blog.deleteOne({ _id: id });
                return res.status(200).json({ message: "Deleted" });
            } else {
                return res.status(403).json({ message: "Unauthorized to delete this blog" });
            }
        } else {
            return res.status(401).json({ message: "You must be logged in" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete blog" });
    }
});

module.exports = router;
