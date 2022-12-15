import axios from "axios";
import axiosClient from "./axiosClient";
import { getHeaderWithToken } from "./getHeaderWithToken";

const getBookDetail = (slug) => {
    let url = `products/books/${slug}`;
    return axiosClient.get(url);
}
const deleteBook = (slug) => {
    let url = `products/books/${slug}`;
    return axiosClient.delete(url, {headers: getHeaderWithToken()});
}

const createBook = (data) => {
    let url = `products/books`;
    return axiosClient.post(url,data, {headers: getHeaderWithToken()});
}

const getAllBooks = (page,limit=24, order='desc_alphabet') => {
    let url = `products/books?limit=${limit}&offset=${page}&order=${order}`;
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
    return axios.post(url, data, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json" ,
            }
    })
}

const searchBooks = (title, page, sort) => {
    console.log("here");
    let url = `products/search?title=${title}&limit=24&offset=${page}&order=${sort}`
    console.log();
    return axiosClient.get(url)
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
    searchBooks,
    deleteBook,
    createBook
}