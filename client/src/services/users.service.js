import { createData } from "../utils/fetchClient";

// create User Service
export const createUser = async (data) => {
    const response = await createData("users", data);
    return response;
};

export const authenticateUser = async (data) => {
    const response = await createData("auth", data);
    return response;
};