const API_URL = "http://localhost:8000";

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
    body: JSON.stringify(data),
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
    body: JSON.stringify(data),
  };

  const response = await fetch(`${API_URL}/${endpoint}/${id}`, options);
  return response.json();
};

// Function to delete data through the API
export const deleteData = async (endpoint, id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'credentials': 'include',
    },
  };

  const response = await fetch(`${API_URL}/${endpoint}/${id}`, options);
  return response.json();
};