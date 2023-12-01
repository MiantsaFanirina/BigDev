import express from "express";
import type {Request, Response} from "express";

// service
import * as PostService from "./post.service";

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
postRouter.post('/posts', async (req: Request, res: Response) => {
    const postData = async (data: any) => {
        try {
            const post = await PostService.createPost(data);
            res.status(201).json(post);

        } catch (err: any) {
            res.status(500).json(err.message);
        }
    };

    let data = {};
    if (req.body.medias) {
        const user_id: string = req.body.user_id;
        const description: string = req.body.description;
        const medias: any[] = req.body.medias;
        data = { user_id, description, media: medias };
        postData(data);
    } else {
        const user_id: string = req.body.user_id;
        const description: string = req.body.description;
        data = { user_id, description };
        postData(data);
    }
});


export {postRouter} 

