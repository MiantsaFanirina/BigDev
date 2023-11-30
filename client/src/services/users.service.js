import { createData, fetchData } from "../utils/fetchClient";

// create User Service
export const createUser = async (data) => {
    const response = await createData("users", data);
    return response;
};

// authentication
export const authenticateUser = async (data) => {
    const response = await createData("auth", data);
    return response;
};

// get user by id
export const getUserById = async (id) => {
    const response = await fetchData(`users/${id}`);
    return response;
};