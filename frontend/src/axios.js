import axios from 'axios';
const api_url = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
    baseURL: api_url,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

export default instance;