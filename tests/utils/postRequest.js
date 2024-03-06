import axios from 'axios';
import {http as configHTTP} from '../../src/configs/main.js';


axios.defaults.baseURL = `http://${configHTTP.host}:${configHTTP.port}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const post = async ( url, request = {} ) => {
    try {
        return await axios.post(`${url}`, request);
    } catch ( error ) {
        return error;
    }
};


export default post;
