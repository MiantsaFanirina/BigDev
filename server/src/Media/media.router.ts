import express from "express";
import type {Request, Response} from "express";
// middleware
import {upload} from "../middleware/uploadImage";
import {cookieJwtAuth} from "../middleware/cookieJwtAuth";

// service
import * as MediaService from "./media.service";

const mediaRouter = express.Router();


// get all media
mediaRouter.get("/media", async (req: Request, res: Response) => {
    const media = await MediaService.getAllMedia();
    res.status(200).json(media);
});
// delete all media
mediaRouter.get("/media/delete", cookieJwtAuth, async (req: Request, res: Response) => {
    const media = await MediaService.deleteAllMedia();
    res.status(200).json(media);
});

// create media and save the post_id and src to the database 
mediaRouter.post('/postMedia', upload.single('media'), cookieJwtAuth, async (req: Request, res: Response) => {
    const post_id: string = req.body.post_id;
    if(req.file) {
        let src: string = req.file.path;
        src = src.replace('medias/', '');
        const data = { post_id, src };
        const media = await MediaService.createMedia(data);
        res.status(201).json(media);
    } else {
        res.status(400).json({message: "image is required"});
    }

});


export {mediaRouter}
