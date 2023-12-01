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