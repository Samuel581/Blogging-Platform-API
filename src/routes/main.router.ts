import { Router } from "express";
//TODO: import controllers
import { getAllBlogs, getOneBlog, createBlog, editBlog, deleteBlog } from "../controllers/blog.controller";
import { createBlogSchema, updateBlogSchema, uuidSchema } from "../schemas/blog.schema";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.get("/post", getAllBlogs)

router.get("/post/:id", validate(uuidSchema), getOneBlog)

router.post("/post",validate(createBlogSchema), createBlog)

router.patch("/post/:id", validate(updateBlogSchema), editBlog)

router.delete("/post/:id", validate(uuidSchema), deleteBlog)

export default router;