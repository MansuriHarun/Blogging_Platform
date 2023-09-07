const router = require("express").Router();
const Blog = require("../models/Blog");

router.get("/allblogs", async(req, res) => {
  try {
    const blog = await Blog.find();
    res.json(blog);
  } catch (error) {
    console.log(error);
  }
})

router.get("/blog/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    res.json(blog);
  } catch (error) {
    console.log(error);
  }
});

router.get("/search", async (req, res) => {
    const { q } = req.query;
    try {
      const blogs = await Blog.find({ title: { $regex: q, $options: "i" } });
      res.json(blogs);
    } catch (error) {
      console.error("Error while searching blogs:", error);
      res.status(500).json({ error: "An error occurred while searching blogs" });
    }
});

module.exports = router;
