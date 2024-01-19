import axios from "axios";

const baseUrl: string = 'http://localhost:8000';

axios.interceptors.request.use(
    (config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    };
    return config
},(error)=>{
    Promise.reject(error)
}
)

const instance = axios.create({
    baseURL : baseUrl
})
export default instance