import { db } from "../utils/db.server";

// get all likes
export const getAllLikes = async (): Promise<any> => {
    return await db.like.findMany();
}

// get like by post id
export const getLikeByPostId = async (id: string): Promise<any> => {
    return await db.like.findMany({
        where: {
            post_id: id
        }
    });
}

// get like by post id and user id
export const getLikeByPostIdAndUserId = async (postId: string, userId: string): Promise<any> => {
    return await db.like.findFirst({
        where: {
          user_id: userId,
          post_id: postId,
        },
    });
}

// create like
export const createLike = async (like: any): Promise<any> => {
    return await db.like.create({
        data: like
    });
}


// delete like
export const deleteLike = async (user_id: string, post_id: string): Promise<any> => {
    // get like id by user id and post id
    const like = await db.like.findFirst({
        where: {
            user_id,
            post_id,
        },
    });
    return await db.like.delete({
        where: {
            id: like?.id,
        },
    });
};