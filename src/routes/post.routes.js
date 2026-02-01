import { createPost, updatePost } from "../controllers/post.controller.js";
import express from "express";

const router = express.Router();

router.post("/", createPost);
router.post("/:id", updatePost);

export default router