import axiosClient from "./axiosClient";
import { getHeaderWithToken } from "./getHeaderWithToken";

const getBookDetail = (slug) => {
    let url = `products/books/${slug}`;
    return axiosClient.get(url);
}

// const createGenre = (data) => {
//     let url ='products/genres';
//     return axiosClient.post(url, data);
// }

// const retrieveGenre = (slug) => {
//     let url =`products/genres/${slug}`;
//     return axiosClient.get(url);
// }

// const deleteGenere = (slug) => {
//     let url =`products/genres/${slug}`;
//     return axiosClient.delete(url);
// }

export default {
    getBookDetail
}