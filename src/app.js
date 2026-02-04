import express from "express";
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"
const app= express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
export default app