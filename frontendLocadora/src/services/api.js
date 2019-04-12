import axios from 'axios';

const api = axios.create({  //cria const axioes para acesso ao backend
    baseURL : 'http://localhost:3000'
});

export default api;