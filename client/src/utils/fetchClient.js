const API_URL = import.meta.env.VITE_BACKEND_URL

// Function to fetch data from the API
export const fetchData = async (endpoint, options = {}) => {
  options.credentials = 'include';
  const response = await fetch(`${API_URL}/${endpoint}`, options);
  return response.json();
};

// Function to create data through the API
export const createData = async (endpoint, data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'credentials': 'include',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  };

  const response = await fetch(`${API_URL}/${endpoint}`, options);
  return response.json();
};

// Function to create data through the API
export const createDataForm = async (endpoint, formData) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    body: formData,
  };

  const response = await fetch(`${API_URL}/${endpoint}`, options);
  return response.json();
};

// Function to update data through the API
export const updateData = async (endpoint, id, data) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'credentials': 'include',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  };

  const response = await fetch(`${API_URL}/${endpoint}/${id}`, options);
  return response.json();
};

// Function to delete data through the API
export const deleteData = async (endpoint) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'credentials': 'include',
    },
    credentials: 'include',
  };

  const response = await fetch(`${API_URL}/${endpoint}`, options);
  return response.json();
};
