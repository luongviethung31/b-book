import axiosClient from "./axiosClient";

const registerUser = (data) => {
    console.log({data});
    let url = 'bbook/users/register';
    return axiosClient.post(url, data);
}

export default {
    registerUser,
}