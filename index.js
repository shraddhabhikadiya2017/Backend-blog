import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import postsRouter from "./routes/postRoutes.js";
import { getHello } from "./controllers/generalControllers.js";
import { sequelize } from "./db/index.js";

dotenv.config();

sequelize.sync();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/posts", postsRouter);

app.get("/", getHello);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
