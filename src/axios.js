import axios from 'axios'
import config from "@/config/config";

const instance = axios.create({
})

instance.defaults.baseURL = config.apiURL



instance.interceptors.response.use(response =>{
    console.log('Interceptors resposta...', response)
    /*if(Array.isArray(response.data)){
        response.data = response.data.slice(1,3)
    }*/
    return response
}, error=>{
    console.log('Erro capturado no interceptador de respostas: ', error)
    return Promise.reject(error)
})
export default instance