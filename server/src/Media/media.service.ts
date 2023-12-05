import { db } from "../utils/db.server";

// get all media
export const getAllMedia = async (): Promise<any> => {
    return await db.media.findMany();
};


// create media
export const createMedia = async (media: any): Promise<any> => {
    return await db.media.create({
        data: media
    });
}

// delete all media
export const deleteAllMedia = async (): Promise<any> => {
    return await db.media.deleteMany();
}

// delete media by post_id
export const deleteMediaByPostId = async (post_id: string): Promise<any> => {
    // find all media by post_id
    const media = await db.media.findMany({
        where: {
            post_id
        },
    });
    const src = []
    // for each media push media.src to src
    for (const item of media) {
        src.push(item.src);
    }
    // delete all media by post_id
    await db.media.deleteMany({
        where: {
            post_id
        },
    });

    return src
}