import { Prisma, PrismaClient } from "@prisma/client";

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
        tags: true,
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
            tags: true,
            },
          },
        );
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
       // Directly connect existing tags to the new Blog
       connect: tagIds?.map((tagId: number) => ({
        id: tagId,
      })) || [],
      },
    },
    // Include the category and tags in the response
    include: {
      tags: true,
      Category: true,
    },
  });
  return newBlog;
};
  
// Partial is a TypeScript utility type that makes all properties of an object optional
export const editBlog = async (id: string, data: Partial<{
  tittle: string;
  content: string;
  categoryId: number;
  tagIds: number[];
}>) => {

  // Pass the data from the request to start building the object and the prisma query
  const updateData: Prisma.BlogUpdateInput = {};

  //CHecking each element if has data from the request, if not it will not be included in the updateData object
  if(data.tittle !== undefined) updateData.title = data.tittle;
  if(data.content !== undefined) updateData.content = data.content;

  // Check if the categoryId is present in the request, if it is, include it in the updateData object
  // This relation is one-to-many so we use the connect key to connect the blog to the category 
  // It connects the blog id into the category that is provied in the request
  if(data.categoryId !== undefined){
    updateData.Category = {
      connect: {id: data.categoryId}
    }
  }

  // Check if the tagIds is present in the request, if it is, include it in the updateData object
  // Warning: this will replace all the current tags with the provided tags
  // This relation is many-to-many, we iterate the list of tags provided and connect one by one to the respective id on the many to many table
  // See schema.prisma file for more information
  if (data.tagIds !== undefined) {
    updateData.tags = {
      set: data.tagIds.map((tagId) => ({
        id: tagId, // Replace all current tags with the provided tags
      })),
    };
  }

  const updatedBlog = await prisma.blog.update({
    where: {
    id: id
      },
      data: updateData,
      include: {
        Category: true,
        tags: true,
      },
  });
  return `Blog ${id} updated successfully`;
}

export const deleteBlog = async (id: string) => {
    return await prisma.blog.delete({
        where: {
        id: id
        }
    });
}