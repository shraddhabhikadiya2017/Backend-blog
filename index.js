import express from "express";
import postsRouter from "./routes/postRoutes.js";
import dotenv from "dotenv";
import { getHello } from "./controllers/generalControllers.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/posts", postsRouter);

app.get("/", getHello);


app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
