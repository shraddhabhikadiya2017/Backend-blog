import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({ connectionString: process.env.PG_URI });

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Database connected");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};
