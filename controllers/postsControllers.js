import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postID = parseInt(id);

    const post = await Post.findByPk(postID);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { author, title, content, cover } = req.body;

    if (!author || !title || !content || !cover) {
      return res.status(400).json({
        message: "The author, title, content and cover are required.",
      });
    }

    const post = await Post.create({ author, title, content, cover });

    if (!post) {
      return res.status(400).json({ message: "Post could not be created " });
    }

    return res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, title, content, cover } = req.body;

    if (!author || !title || !content || !cover) {
      return res
        .status(400)
        .json({ message: "New author, title, content and cover are required" });
    }

    const postID = parseInt(id);

    const post = await Post.findByPk(postID);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const updatedPost = await post.update({ author, title, content, cover });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postID = parseInt(id);

    const post = await Post.findByPk(postID);

    if (!post) return res.status(404).json({ error: "Post not found" });

    await post.destroy();

    return res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
