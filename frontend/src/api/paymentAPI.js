import axiosClient from "./axiosClient";
import { getHeaderWithToken } from "./getHeaderWithToken";

// const getBookDetail = (slug) => {
//     let url = `products/books/${slug}`;
//     return axiosClient.get(url);
// }

const createPayment = (data) => {
    let url ='payments/order';
    return axiosClient.post(url, data, {headers: getHeaderWithToken()});
}

// const retrieveGenre = (slug) => {
//     let url =`products/genres/${slug}`;
//     return axiosClient.get(url);
// }

// const deleteGenere = (slug) => {
//     let url =`products/genres/${slug}`;
//     return axiosClient.delete(url);
// }

export default {
    createPayment
}