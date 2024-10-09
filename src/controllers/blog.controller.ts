import { Request, Response } from "express";
import * as BlogService from "../services/blog.service";
import { error } from "console";

const getAllBlogs = async (req: Request, res: Response) => {
    try{
        const blogs =  await BlogService.getBlogs();
        res.status(200).json(blogs);
    }
    catch(err){
        res.status(500).json({error: 'Something went wrong'})
    }
}

const getOneBlog = async (req: Request, res: Response) => {
    try{
        const id: string = req.params.id
        const blog = await BlogService.getBlog(id);
        console.log(blog);
        res.status(200).json(blog)
    }
    catch(err){
        res.status(404).json(`Blog not found: ${error}`)
    }
}

const createBlog = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const blog = await BlogService.createBlog(data);
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json(error)
    }
}

const editBlog = (req: Request, res: Response) => {
    try {
        const data = req.body;
        const id: string = req.params.id;
        const blog = BlogService.editBlog(id, data);
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json(`Blog not found: ${error}`);
    }
}

const deleteBlog = (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        BlogService.deleteBlog(id);
        res.status(200).json('Blog deleted');
    } catch (error) {
        res.status(500).json(error);
    }
}

export { getAllBlogs, getOneBlog, createBlog, editBlog, deleteBlog }