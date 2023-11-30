import { fetchData, createData, deleteData } from "../utils/fetchClient";

export async function getLikesByPostId(postId) {
    const response = fetchData(`likes/${postId}`);
    return response;
}

export async function createLike(postId, user_id) {
    const response = createData(`likes/${postId}/${user_id}`, {});
    return response;
}

export async function deleteLike (postId, user_id) {
    const response = deleteData(`likes/${postId}/${user_id}`, {});
    return response;
}

export async function isPostLikeByAUser(postId, user_id) {
    const response = fetchData(`likes/${postId}/${user_id}`);
    return response;
}
