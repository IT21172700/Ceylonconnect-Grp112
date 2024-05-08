import { Router } from "express";
import Blog from "../../models/blog/Blog.js";
import User from "../../models/User.js";

const router = Router();

router.post('/add', async (req, res) => {
  try {
    const {userId, blogName, blogPlaces, bloggerName, blogContent } = req.body;

    // Create a new blog
    const newBlog = new Blog({
      userId,
      blogName,
      blogPlaces,
      bloggerName,
      blogContent,
    });

    // Save the new blog
    await newBlog.save();

    // Increment the user's points
    const username = req.body.username;
    const user = await User.findOne({ userName: username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.userPoints += 100;
    await user.save();

    return res.json({ message: 'Blog added and points incremented by 100' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

//get all blogs
router.route("/").get((req, res) => {
  const blogs = Blog.find()
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get specific blog
router.route("/:id").get((req, res) => {
    Blog.findById(req.params.id)
        .then((blog) => {
        res.json(blog);
        })
        .catch((err) => {
        console.log(err);
        });
    }
);

router.post('/decrease-points', async (req, res) => {
  try {
    const username = req.body.username;
    const pointsToDecrease = req.body.points;

    const user = await User.findOne({ userName: username });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.userPoints < pointsToDecrease) {
      return res.status(400).json({ error: 'Insufficient points.' });
    }

    user.userPoints -= pointsToDecrease;
    await user.save();

    res.json({ message: 'Points decreased successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while decreasing points.' });
  }
});


router.put('/update/:id', async (req, res) => {
  try {
    const { blogName, blogPlaces, bloggerName, blogContent } = req.body;

    // Find the blog by ID and update it
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        blogName,
        blogPlaces,
        bloggerName,
        blogContent,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    return res.json({ message: 'Blog updated successfully', updatedBlog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Delete the blog
    await blog.remove();

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;