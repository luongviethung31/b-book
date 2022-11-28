import axiosClient from "./axiosClient";
import { getHeaderWithToken } from "./getHeaderWithToken";

const getAllGenre = () => {
    let url = 'products/genres';
    return axiosClient.get(url);
}

const createGenre = (data) => {
    let url ='products/genres';
    return axiosClient.post(url, data);
}

const retrieveGenre = (slug) => {
    let url =`products/genres/${slug}`;
    return axiosClient.get(url);
}

const deleteGenere = (slug) => {
    let url =`products/genres/${slug}`;
    return axiosClient.delete(url);
}

export default {
    getAllGenre,
    createGenre,
    retrieveGenre,
    deleteGenere
}