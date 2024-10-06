import { Router } from "express";
//TODO: import controllers
import { getAllBlogs, getOneBlog, createBlog, editBlog, deleteBlog } from "../controllers/blog.controller";

const router = Router();

router.get("/post", getAllBlogs)

router.get("/post/:id", getOneBlog)

router.post("/post", createBlog)

router.patch("/post/:id", editBlog)

router.delete("/post/:id", deleteBlog)

export default router;