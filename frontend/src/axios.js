import axios from 'axios';
const api_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const instance = axios.create({
    baseURL: api_url,
    timeout: 10000,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    headers: { 'Content-Type': 'application/json' }
});

export default instance;