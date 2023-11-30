import express from "express";
import type {Request, Response} from "express";
import WebSocket from 'ws';

// service
import * as LikeService from "./like.service";

const likeRouter = express.Router();
let wss: WebSocket.Server;

// Broadcast like update function
export const broadcastLikeUpdate = async (postId: string, isLiked: boolean) => {
    try {
        const likes = await LikeService.getLikeByPostId(postId);
        const update = {
            postId,
            isLiked,
            likeCount: likes.length,
        };
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(update));
            }
        });
    } catch (err) {
        console.error('Error broadcasting like update:', err);
    }
};


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

// create likes with postId and userId params from the url
likeRouter.post("/likes/:postId/:userId", async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    try {
        const like = await LikeService.createLike({ post_id: postId.toString(), user_id: userId.toString() });

        // Broadcast like update to all connected clients
        broadcastLikeUpdate(postId, true);

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
    try {
        await LikeService.deleteLike(userId, postId);

        // Broadcast like update to all connected clients
        broadcastLikeUpdate(postId, false);

        res.status(200).json({ message: "Like deleted", confirmation: true });
    } catch (err: any) {
        res.status(500).json(err.message);
    }
});
export {likeRouter} 