import axios from 'axios';
import {http as configHTTP} from '../../src/configs/main.js';


axios.defaults.baseURL = `http://${configHTTP.host}:${configHTTP.port}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const post = async ( url, request, config ) => {
    try {
        return await axios.post(`${url}`, request, config);
    } catch ( error ) {
        return error;
    }
};


export default post;
