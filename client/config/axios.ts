import axios from "axios";

const baseUrl: string = 'https://gadgetease.online';


const instance = axios.create({
    baseURL : baseUrl
})
export default instance