import axiosClient from "./axiosClient";
import { getHeaderWithToken } from "./getHeaderWithToken";

const registerUser = (data) => {
    console.log({data});
    let url = 'users/register';
    return axiosClient.post(url, data);
}

const login = (data) => {
    let url ='users/login';
    return axiosClient.post(url, data);
}

const logout = () => {
    let url ='users/logout';
    return axiosClient.post(url, {headder: getHeaderWithToken()});
}

const getUserInfo = () => {
    let url ='users/info';
    return axiosClient.get(url, {headder: getHeaderWithToken()});
}

const getAllUsers = () => {
    let url ='users/getAll';
    return axiosClient.get(url, {headder: getHeaderWithToken()});
}


export default {
    registerUser,
    login,
    logout,
    getUserInfo,
    getAllUsers
}