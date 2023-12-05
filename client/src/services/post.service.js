import {createData, createDataForm, fetchData, deleteData} from '../utils/fetchClient'

// get all posts
export const getAllPosts = async () => {
  const response = await fetchData('posts')
  return response
}

// create post

export const createPost = async (data) => {
  const { user_id, description, medias } = data;

  const response = await createData('posts', { user_id, description });
  const post_id = response.id;

  if (medias) {
    for (const media of medias) {

      // Create a FormData object
      const formData = new FormData();
      // Append the post_id
      formData.append('post_id', post_id);
      // Append the media
      formData.append('media', media);
      
      const mediaResponse = await createDataForm('postMedia', formData);
    }
  }
  return response;
};

// delete post
export const deletePost = async (id) => {
    const response = await deleteData(`posts/${id}`)
    return response
}