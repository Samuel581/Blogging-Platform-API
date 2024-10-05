import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export const getBlogs = async () => {
  // Prisma query to return all data from a table
  return await prisma.blog.findMany(
    {
      //Include category and tags which are related tables and not a direct part of the blog table
      include: {
        // Include category (ID and name)
        Category: true,
        // Include list of tags(ID and name) related to the blog
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
    // Get one blog, the only thing that changes is the where clause in the query and the query call
    // the rest of the code is the same as getBlogs
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
  // Define the data and types that will be passed to the function, this for a better understanding and readbility of the code
  title: string;
  content: string;
  categoryId: number;
  tagIds?: number[];
}) => {
  // Destructure the data object
  const { title, content, categoryId, tagIds } = data;
  
  // Prisma query to create a new blog
  const newBlog = await prisma.blog.create({
    // Define the data that will be passed to the query
    data: {
      // Single data fields
      title,
      content,
      categoryId,
      // Nested data fields
      tags: {
        // Create new BlotTag entries for each tag on the request
        create: tagIds?.map((tagId: number) => ({
          // Connect each BlogTag to an existing tag
          tag: {
            connect: { id: tagId }
          }
        })) || [],
      },
    },
    // Include the category and tags in the response
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
      Category: true,
    },
  });
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