import axiosClient from "./axiosClient";
import { getHeaderWithToken } from "./getHeaderWithToken";

const registerUser = (data) => {
    let url = 'users/register';
    return axiosClient.post(url, data);
}

const login = (data) => {
    let url ='users/login';
    return axiosClient.post(url, data);
}

const logout = () => {
    let url ='users/logout';
    return axiosClient.get(url, {headers: getHeaderWithToken()});
}

const getUserInfo = () => {
    let url ='users/info';
    return axiosClient.get(url, {headers: getHeaderWithToken()});
}

const getAllUsers = () => {
    let url ='users/getAll';
    return axiosClient.get(url, {headers: getHeaderWithToken()});
}

const changePassword = (data) => {
    let url = `users/change-password`
    return axiosClient.put(url,data, {headers: getHeaderWithToken()});
}


export default {
    registerUser,
    login,
    logout,
    getUserInfo,
    getAllUsers,
    changePassword
}