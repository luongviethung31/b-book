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

const deleteGenre = (slug) => {
    let url =`products/genres/${slug}`;
    return axiosClient.delete(url, {headers: getHeaderWithToken()});
}
const updateGenre = (slug, data) => {
    let url =`products/genres/${slug}`;
    return axiosClient.put(url, data, {headers: getHeaderWithToken()});
}
const addGenre = (data) => {
    let url =`products/genres`;
    return axiosClient.post(url, data, {headers: getHeaderWithToken()});
}
const getAllAuthors = () => {
    let url = 'products/authors';
    return axiosClient.get(url);
}

export default {
    getAllGenre,
    createGenre,
    retrieveGenre,
    deleteGenre,
    updateGenre,
    addGenre,
    getAllAuthors
}