import express from "express";
import type {Request, Response} from "express";
import fs from "fs";
// middleware
import {upload} from "../middleware/uploadImage";
import {cookieJwtAuth} from "../middleware/cookieJwtAuth";

// service
import * as PostService from "./post.service";
import * as MediaService from "../Media/media.service";

const postRouter = express.Router();




// get all posts
postRouter.get("/posts", async (req: Request, res: Response) => {
    const posts = await PostService.getAllPosts();
    res.status(200).json(posts);
});


// get single post
postRouter.get("/posts/:id", async (req: Request, res: Response) => {
    const post = await PostService.getSinglePost(req.params.id);
    res.status(200).json(post);
});

// create post
postRouter.post('/posts', cookieJwtAuth, async (req: Request, res: Response) => {
    
    const user_id: string = req.body.user_id;
    const description: string = req.body.description;

    const data = { user_id, description };
    const post = await PostService.createPost(data);

    res.status(201).json(post);
      
});

// delete post
postRouter.delete("/posts/:id", cookieJwtAuth, async (req: Request, res: Response) => {
    const srcs = await MediaService.deleteMediaByPostId(req.params.id);
    // delete from the medias folder
    if(srcs) {
        for(let i = 0; i < srcs.length; i++) {
            const src = srcs[i];
            fs.unlinkSync(`./medias/${src}`);
        }
    }
    const post = await PostService.deletePost(req.params.id);
    res.status(200).json(post);
});

export {postRouter} 

