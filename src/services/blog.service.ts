import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export const getBlogs = async () => {
  return await prisma.blog.findMany(
    {
      include: {
        Category: true,
        tags: {          
          include: {
            tag: true,   
          },
        },
      },
    }
  );
};

export const getBlog = async (id: string) => {
    const blog = await prisma.blog.findUnique({
        where: {
            id: id,
          },
          include: {
            Category: true,
            tags: {          
              include: {
                tag: true,   
              },
            },
          },
  });
  return blog;
};

export const createBlog = async (data: {
  title: string;
  content: string;
  categoryId: number;
  tagIds?: number[];
}) => {
  const { title, content, categoryId, tagIds } = data;
  
  const newBlog = await prisma.blog.create({
    data: {
      title,
      content,
      categoryId,
      tags: {
        create: tagIds?.map((tagId: number) => ({
          tag: {
            connect: { id: tagId }
          }
        })) || [],
      },
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
      Category: true,
    },
  });

  console.log(JSON.stringify(newBlog, null, 2));
  return newBlog;
};
  

export const editBlog = async (id: string, data: any) => {
    return await prisma.blog.update({
        where: {
        id: id
        },
        data: data
    });
}

export const deleteBlog = async (id: string) => {
    return await prisma.blog.delete({
        where: {
        id: id
        }
    });
}