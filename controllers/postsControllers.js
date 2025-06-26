import { client } from "../db/dbConnections.js";

export const getAllPosts = async (req, res) => {
  try {
    const results = await client.query("SELECT * FROM posts");

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postID = parseInt(id);

    const results = await client.query("SELECT * FROM posts WHERE id = $1", [
      postID,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Posts not found" });
    }

    return res.status(200).json(results.rows[0]);
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
    const results = await client.query(
      "INSERT INTO posts (author, title, content, cover) VALUES ($1, $2, $3, $4) RETURNING *",
      [author, title, content, cover]
    );
    return res.status(201).json(results.rows[0]);
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
    const postExists = await client.query("SELECT * FROM posts WHERE id = $1", [
      postID,
    ]);
    if (postExists.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const results = await client.query(
      "UPDATE posts SET author = $1, title = $2, content = $3, cover = $4 WHERE id = $5 RETURNING *",
      [author, title, content, cover, postID]
    );

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postID = parseInt(id);
    const postExists = await client.query("SELECT * FROM posts WHERE id = $1", [
      postID,
    ]);
    if (postExists.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const results = await client.query("DELETE FROM posts WHERE id = $1", [
      postID,
    ]);

    if (results.rowCount === 1) {
      return res.status(200).json({ message: "Post deleted successfully!" });
    }

    res.status(500).json({ message: "Failed to delete post" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
