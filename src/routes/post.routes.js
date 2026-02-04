import { createPost, updatePost,getAllPosts, likePost } from "../controllers/post.controller.js";
import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/",protect,upload.single("image"), createPost);
router.post("/:id",protect,upload.single("image"), updatePost);
router.get("/getPosts", protect, getAllPosts);
router.get("/:id/like", protect, likePost);

export default router