import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-2f9fa-default-rtdb.firebaseio.com/'
});

export default instance;