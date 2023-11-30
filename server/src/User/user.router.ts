import express from "express";
import type {Request, Response} from "express";
import {body, validationResult} from "express-validator";
import bcrypt from 'bcryptjs';

// JWT
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// service
import * as UserService from "./user.service";

export const userRouter = express.Router();

// GET all users /users
userRouter.get("/users", async (req: Request, res: Response) => {
    try{
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json(err.message);
    }
});


// GET Single user
userRouter.get("/users/:id", async (req: Request, res: Response) => {
    try{
        const user = await UserService.getSingleUser(req.params.id);
        res.status(200).json(user);
    } catch (err: any) {
        res.status(500).json(err);
    }
});


// POST create user
userRouter.post("/users", async (req: Request, res: Response) => {
    
    const {username, password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try{


        // Hash the password before creating the user
        const hashedPassword: string = await bcrypt.hash(password, 10);


        const user = await UserService.createUser({name: username, password: hashedPassword});

        const token = jwt.sign(
            {user_id: user.id, username},
            process.env.TOKEN_KEY as string,
            {
                expiresIn: "720h",
            }
        );
        
        
        res.status(201).json({...user, token});
    } catch (err: any) {
        res.status(500).json({...err, message: "user already exists"});
    }
});

// authenticate user
userRouter.post("/auth", async (req: Request, res: Response) => {
    const {name, password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const user = await UserService.getSingleUserByUsername(name);
        if (!user) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        if(user.password) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({message: "Invalid credentials"});
            }

            const token = jwt.sign(
                {user_id: user.id, name},
                process.env.TOKEN_KEY as string,
                {
                    expiresIn: "720h",
                }
            );
            res.status(200).json({...user, token});
        }
        
    } catch (err: any) {
        res.status(500).json(err);
    }

});