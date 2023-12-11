import axios from "axios";

const baseUrl: string = 'http://localhost:8000';

const instance = axios.create({
    baseURL : baseUrl
})
export default instance