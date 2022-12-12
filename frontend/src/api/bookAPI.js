import axios from "axios";
import axiosClient from "./axiosClient";
import { getHeaderWithToken } from "./getHeaderWithToken";

const getBookDetail = (slug) => {
    let url = `products/books/${slug}`;
    return axiosClient.get(url);
}

const getAllBooks = (page,limit=24) => {
    let url = `products/books?limit=${limit}&offset=${page}`;
    return axiosClient.get(url);
}

const getAllBookId = () => {
    let url = `products/all-book-id`;
    return axiosClient.get(url);
}

const getBooksFromListId = (data) => {
    let url = `products/all-book-id`;
    return axiosClient.post(url,data);
}

const getRatingStatistics = (slug) => {
    let url = `products/books/${slug}/rating-statistics`;
    return axiosClient.get(url);
}

const getAllCommentPerBook = (slug, page) => {
    let url = `products/books/${slug}/rating?limit=6&offset=${page}`;
    return axiosClient.get(url);
}

const createRating = (slug, data) => {
    let url = `products/books/${slug}/rating`;
    return axiosClient.post(url, data, {headers: getHeaderWithToken()});
}

const getRecommendedBook = (data) => {
    // console.log(process.env.SERVER_AI);
    let url = `${process.env.REACT_APP_SERVER_AI}api/v1/recommend/books`;
    return axios.post(url, data)
}

const searchBooks = (title, page) => {
    let url = `products/search?title=${title}&limit=24&offset=${page}`
    return axios.get(url)
}

export default {
    getBookDetail,
    getAllBooks,
    getRatingStatistics,
    getAllCommentPerBook,
    createRating,
    getBooksFromListId,
    getAllBookId,
    getRecommendedBook,
    searchBooks
}