import express from "express";
import type {Request, Response} from "express";

// service
import * as LikeService from "./like.service";

const likeRouter = express.Router();

// get all likes
likeRouter.get("/likes", async (req: Request, res: Response) => {
    try{
        const likes = await LikeService.getAllLikes();
        res.status(200).json(likes);
    } catch (err: any) {
        res.status(500).json(err.message);
    }
});

// get likes by post id
likeRouter.get("/likes/:id", async (req: Request, res: Response) => {
    try{
        const likes = await LikeService.getLikeByPostId(req.params.id);
        res.status(200).json(likes);
    } catch (err: any) {
        res.status(500).json(err.message);
    }
});

//create likes with postId and userId params from the url
likeRouter.post("/likes/:postId/:userId", async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    try{
        const like = await LikeService.createLike({post_id: postId.toString(), user_id: userId.toString()});
        res.status(201).json(like);
    } catch (err: any) {
        res.status(500).json(err.message);
    }
});

// get likes by post id and user id
likeRouter.get("/likes/:postId/:userId", async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    try{
        const like = await LikeService.getLikeByPostIdAndUserId(postId, userId);
        console.log(like);
        if(!like || like === null) {
            res.status(200).json({isLiked: false});
            return;
        }else {
            res.status(200).json({...like, isLiked: true});
    
        }
    } catch (err: any) {
        res.status(500).json({err, isLiked: false});
    }
});

// delete like
likeRouter.delete("/likes/:postId/:userId", async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    try{
        await LikeService.deleteLike(userId, postId);
        res.status(200).json({message: "Like deleted", confirmation: true});
    } catch (err: any) {
        res.status(500).json(err.message);
    }
});

export {likeRouter} 