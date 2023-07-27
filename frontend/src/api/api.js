import axios from 'axios';

const baseURL = 'http://localhost:3000/api'; // Replace with your backend API URL

const getLocalStorageToken = () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    throw new Error('No JWT token found in localStorage.');
  }
  return token;
};

// Function to make an authenticated GET request
export const getAuthenticated = (url) => {
  const token = getLocalStorageToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios.get(`${baseURL}/${url}`, { headers })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error in getAuthenticated:', error.message);
      throw error.response.data;
    });
};

// Function to make an authenticated POST request
export const postAuthenticated = (url, data) => {
  const token = getLocalStorageToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios.post(`${baseURL}/${url}`, data, { headers })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error in postAuthenticated:', error.message);
      throw error.response.data;
    });
};

// Function to make an authenticated PUT request
export const putAuthenticated = (url, data) => {
  const token = getLocalStorageToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios.put(`${baseURL}/${url}`, data, { headers })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error in putAuthenticated:', error.message);
      throw error.response.data;
    });
};

// Function to make an authenticated DELETE request
export const deleteAuthenticated = (url) => {
  const token = getLocalStorageToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios.delete(`${baseURL}/${url}`, { headers })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error in deleteAuthenticated:', error.message);
      throw error.response.data;
    });
};

const api = axios.create({
  baseURL,
  timeout: 5000, 
});

// Function to upload a file to the backend
export const uploadFile = async (formData) => {
  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to create a link for sharing a file
export const createFileLink = async (fileId, email) => {
  try {
    const response = await api.post('/create-link', { fileId, email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch all links for a file
export const getFileLinks = async (fileId) => {
  try {
    const response = await api.get(`/file-links/${fileId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to control access to a file via email
export const accessFile = async (fileId, email) => {
  try {
    const response = await api.post('/access-file', { fileId, email });
    return response.data;
  } catch (error) {
    throw error;
  }
};