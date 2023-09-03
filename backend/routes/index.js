const router = require("express").Router();
const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/signup");


router.get("/", (req, res) => {
    res.send("Hello World");
})

router.get('/cors', (req, res) => {
res.set('Access-Control-Allow-Origin', '*');
res.send({ "msg": "This has CORS enabled 🎈" })
});

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

        const { UserId } = req.cookies;
        if (UserId) {
            const decodedToken = jwt.verify(UserId, process.env.SECRET_KEY);
            const userId = decodedToken._id;

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
// .get("/edit/:id", async (req, res) => {
//     const {id} = req.params;
//     const getBlog = await Blog.findById(id);
//     res.redirect("/allblogs", {getBlog})
// }).post("/edit/:id", async (req, res) => {
//     const {id} = req.params;
//     const { title, description } = req.body;
//     Blog.updateOne({ id }, { title, description }).then(() => {
//         res.json({message: "Updated"});
//         console.log("Blog updated successfully");
//     }).catch((err) => {
//         console.log(err);
//     })
// })


module.exports = router;
