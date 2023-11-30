import { db } from "../utils/db.server";


// dto
import {UserDto, CreateUserDto} from "./user.dto";


// get all users
export const getAllUsers = async (): Promise<UserDto[]> => {
    return await db.user.findMany(
        {
            select: {
                id: true,
                name: true,
                profile_picture_url: true,
                password: false,
            },
        }
    );
};

// get Single user
export const getSingleUser = async (id: string) : Promise<UserDto | null> => {
    const user : UserDto | null  = await db.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            profile_picture_url: true,
            password: false,
        },
    });
    return user;
};

// get single user by username
export const getSingleUserByUsername = async (username: string) : Promise<UserDto | null> => {
    const user : UserDto | null  = await db.user.findUnique({
        where: {
            name: username,
        },
        select: {
            id: true,
            name: true,
            profile_picture_url: true,
            password: true,
        },
    });
    return user;
};

// create user
export const createUser = async (user: CreateUserDto) : Promise<UserDto> => {
    const {name, password} = user;
    const profile_picture_url = "";
    return await db.user.create({
        data: {name, password, profile_picture_url},
        select: {
            id: true,
            name: true,
            profile_picture_url: false,
            password: false,
        },
    });
};


