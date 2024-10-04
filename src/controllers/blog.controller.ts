import { Request, Response } from "express";
const getAllBlogs = (req: Request, res: Response) => {
    res.send('Get all blogs')
}

const getOneBlog = (req: Request, res: Response) => {
    res.send('Get one blog');
}

const createBlog = (req: Request, res: Response) => {
    res.send('Create blog')
}

const editBlog = (req: Request, res: Response) => {
    res.send('Edit blog')
}

const deleteBlog = (req: Request, res: Response) => {
    res.send('Delete blog')
}

export { getAllBlogs, getOneBlog, createBlog, editBlog, deleteBlog }