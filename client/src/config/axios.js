import axios from 'axios';

const instance = axios.create({
        baseURL: 'http://localhost:6001/api'
        // baseURL: 'https://techfrairbackend.onrender.com/api'    
    });
    
export default instance;