import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBlogs = async () => {
  return await prisma.blog.findMany();
};

export const getBlog = async (id: string) => {
  return await prisma.blog.findUnique({
    where: {
      id: id
    }
  });
};

export const createBlog = async (data: any) => {
  return await prisma.blog.create({
    data: data
  });
};

export const editBlog = async (id: string, data: any) => {
    return await prisma.blog.update({
        where: {
        id: id
        },
        data: data
    });
}