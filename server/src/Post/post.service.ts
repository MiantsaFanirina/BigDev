import { db } from "../utils/db.server";

// dto
import {
    postDto
} from "./post.dto";

// get all posts
export const getAllPosts = async (): Promise<any> => {
    return await db.post.findMany();
};

// get single post
export const getSinglePost = async (id: string): Promise<any> => {
    return await db.post.findUnique({
        where: {
            id
        }
    });
};


// createPost
export const createPost = async (post: any): Promise<any> => {
    return await db.post.create({
        data: post
    });
}


// delete post
export const deletePost = async (id: string): Promise<any> => {
    await db.comment.deleteMany({
        where: {
          post_id: id,
        },
    });
    await db.media.deleteMany({
        where: {
          post_id:id,
        },
    });

    await db.like.deleteMany({
        where: {
          post_id: id,
        },
    });

    const deletedPost = await db.post.delete({
        where: {
          id: id,
        }
    });
    return deletedPost;
}