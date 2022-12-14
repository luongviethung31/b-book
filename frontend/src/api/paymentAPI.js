import axiosClient from "./axiosClient";
import { getHeaderWithToken } from "./getHeaderWithToken";

// const getBookDetail = (slug) => {
//     let url = `products/books/${slug}`;
//     return axiosClient.get(url);
// }

const createOrder = (data) => {
    let dataOrder = {
        ...data,
        ship_date: new Date()
    }
    let url ='payments/order';
    return axiosClient.post(url, dataOrder, {headers: getHeaderWithToken()});
}
const getAllOrderDetail = (id) => {
    let url =`payments/order/${id}`;
    return axiosClient.get(url, {headers: getHeaderWithToken()});
}
const updateOrder = (id, data) => {
    let url =`payments/order/${id}`;
    return axiosClient.put(url, data, {headers: getHeaderWithToken()});
}
const deleteOrder = (id) => {
    let url =`payments/order/${id}`;
    return axiosClient.delete(url, {headers: getHeaderWithToken()});
}

const allOrder = () => {
    let url ='payments/all-order';
    return axiosClient.get(url, {headers: getHeaderWithToken()});
}

const getAllUserOrder = () => {
    let url ='payments/order';
    return axiosClient.get(url, {headers: getHeaderWithToken()});
}

// const retrieveGenre = (slug) => {
//     let url =`products/genres/${slug}`;
//     return axiosClient.get(url);
// }

// const deleteGenere = (slug) => {
//     let url =`products/genres/${slug}`;
//     return axiosClient.delete(url);
// }
// const createOrder = ({data}) => {

// }


export default {
    getAllUserOrder,
    createOrder,
    getAllOrderDetail,
    updateOrder,
    allOrder,
    deleteOrder,
}