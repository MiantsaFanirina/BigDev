import {createData, fetchData} from '../utils/fetchClient'

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