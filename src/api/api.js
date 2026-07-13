import axios from "axios";

const api = axios.create({
baseURL:"http://localhost:3000"});

api.interceptors.request.use((config)=>
    {
const token=localStorage.getItem("token");
if (token)
{
    config.headers.Authorization=`Bearer ${token}`;
}
console.log("Sending Request");
console.log(config.url);
return config;
},
(error)=>
    {
return Promise.reject(error);
});

api.interceptors.response.use((response)=>
    {
console.log("Response Received");
console.log(response.data);
return response;
},
(error)=>{
console.log("Response Error");
return Promise.reject(error);
}
);
export default api;