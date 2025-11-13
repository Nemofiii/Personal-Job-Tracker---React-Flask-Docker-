import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
})

export default api;

// This file sets up an Axios instance with a base URL for API requests.
// This keeps all API calls consistent.