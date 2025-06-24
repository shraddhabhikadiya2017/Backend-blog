import { client } from "../db/dbConnections.js";

const posts = [
  {
    id: 1,
    title: "First Post",
    content: "This is the content of the first post.",
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the content of the second post.",
  },
];

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

    if (!id) {
      return res.status(400).json({ error: "Missing posts ID" });
    }

    const results = await client.query("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "posts not found" });
    }

    return res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createPost = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
};

export const updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  posts[postIndex] = { id: parseInt(id), title, content };
  res.json(posts[postIndex]);
};

export const deletePost = (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.send("Post deleted successfully");
};
