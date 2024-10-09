import {z} from 'zod';

//Schema for validate the creation of an blog
export const createBlogSchema = z.object({
    title: z.string().min(10, {message: "Tittle has to be at least 10 characters long"}),
    content: z.string().min(30, {message: "The content has to have at least 30 characters"}),
    categoryId: z.number().int({message:"Category ID must be an integer"}),
    tagsIds: z.array(z.number().int({message: "Each tag has to be an integer"})).optional(),
})

//Schema for validate the creation of an blog
export const updateBlogSchema = z.object({
    title: z.string().min(10, {message: "Tittle has to be at least 10 characters long"}).optional(),
    content: z.string().min(30, {message: "The content has to have at least 30 characters"}).optional(),
    categoryId: z.number().int({message:"Category ID must be an integer"}).optional(),
    tagsIds: z.array(z.number().int({message: "Each tag has to be an integer"})).optional(),
})

export const uuidSchema = z.object({
    id: z.string().uuid({message: "The id must be valid"}),
})