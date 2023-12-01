import {createData, fetchData, deleteData} from '../utils/fetchClient'

// get all posts
export const getAllPosts = async () => {
  const response = await fetchData('posts')
  return response
}

// create post
export const createPost = async (data) => {
    const response = await createData('posts', data)
    return response
}

// delete post
export const deletePost = async (id) => {
    const response = await deleteData(`posts/${id}`)
    return response
}