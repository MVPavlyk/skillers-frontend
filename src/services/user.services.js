import {axiosServices} from './axios.services';
import {urls} from '../config';


export const userServices = {
    register: (regObj) => axiosServices.post(urls.register, regObj).then(value => value.data),
    login: (regObj) => axiosServices.post(urls.login, regObj).then(value => value.data)
};