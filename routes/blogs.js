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


// Pagination Route

// router.get("/allblogs", async(req, res) => {
//   const blogsPerPage = 10;
//     try {
//     const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameters

//     // Calculate the skip value based on the page number and blogsPerPage
//     const skip = (page - 1) * blogsPerPage;

//     // Fetch blogs for the current page
//     const blog = await Blog.find()
//       .skip(skip)
//       .limit(blogsPerPage)
//       .exec();

//     res.json({
//       success: true,
//       page,
//       blog,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error fetching blogs' });
//   }
// });

module.exports = router;