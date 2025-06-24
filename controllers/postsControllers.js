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

export const getAllPosts = (req, res) => {
  res.json(posts);
};

export const getPostById = (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
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
