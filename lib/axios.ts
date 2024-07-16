import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default instance;