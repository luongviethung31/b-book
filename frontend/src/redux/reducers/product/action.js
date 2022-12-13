import * as types from './types'
import genreAPI from 'api/genreAPI'
import useNotification from 'hooks/notification'
import bookAPI from 'api/bookAPI'

const getAllGenre = (callback = () => { }) => {
    return (dispatch) => {
        dispatch({
            type: types.GET_ALL_GENRE,
        })
        genreAPI.getAllGenre()
            .then((rs) => {
                if (rs.status === 200) {
                    dispatch({
                        type: types.GET_ALL_GENRE_SUCCESS,
                        payload: rs.data
                    })
                }
            })
            .catch(e => {
                dispatch({
                    type: types.GET_ALL_GENRE_FAIL,
                })
            })
        callback()
    }
}

const getAllAuthors = (callback = () => { }) => {
    return (dispatch) => {
        dispatch({
            type: types.GET_ALL_AUTHOR,
        })
        genreAPI.getAllAuthors()
            .then((rs) => {
                if (rs.status === 200) {
                    dispatch({
                        type: types.GET_ALL_AUTHOR_SUCCESS,
                        payload: rs.data
                    })
                }
            })
            .catch(e => {
                dispatch({
                    type: types.GET_ALL_AUTHOR_FAIL,
                })
            })
        callback()
    }
}

const deleteGenre = (data, callback = () => { }) => {
    return (dispatch) => {
        genreAPI.deleteGenre(data.slug)
            .then(rs => {
                if (rs.status === 204) {
                    dispatch({
                        type: types.DELETE_GENRE,
                        payload: data.slug,
                    })
                    useNotification.Success({
                        title: "XÓA THÀNH CÔNG!",
                        message: `Đã xóa ${data.title}`
                    })
                    callback()
                }
            })
            .catch(() => {
                useNotification.Error({
                    title: "LỖI",
                    message: "Xóa không thành công!"
                })
            })
    }
}

const addGenre = (data, callback = () => { }) => {
    return (dispatch) => {
        genreAPI.addGenre(data)
            .then(rs => {
                if (rs.status === 201) {
                    dispatch({
                        type: types.ADD_GENRE,
                        payload: rs.data
                    })
                    useNotification.Success({
                        title: "THÊM THÀNH CÔNG!",
                        message: `Đã them ${rs.data.title}`
                    })
                    callback()
                }
            })
            .catch(() => {
                useNotification.Error({
                    title: "LỖI",
                    message: "Them không thành công!"
                })
            })
    }
}



const getListProductSearch = (title, page, sort = 'asc_alphabet', callback = () => { }) => {
    return (dispatch) => {
        dispatch({
            type: types.GET_LIST_PRODUCT,
        })
        bookAPI.searchBooks(title, page, sort).then((rs) => {
            if (rs.status === 200) {
                dispatch({
                    type: types.GET_LIST_PRODUCT_SUCCESS,
                    payload: rs.data.results
                })
                callback(rs.data.count)
            }
        })
            .catch(e => {
                dispatch({
                    type: types.GET_LIST_PRODUCT_FAIL,
                })
            })
    }
}
const getListProduct = (by, slug, page, sort = 'asc_alphabet', callback = () => { }) => {
    return (dispatch) => {
        dispatch({
            type: types.GET_LIST_PRODUCT,
        })
        genreAPI.getListProduct(by, slug, page, sort)
            .then((rs) => {
                if (rs.status === 200) {
                    dispatch({
                        type: types.GET_LIST_PRODUCT_SUCCESS,
                        payload: rs.data.results
                    })
                    callback(rs.data.count)
                }
            })
            .catch(e => {
                dispatch({
                    type: types.GET_LIST_PRODUCT_FAIL,
                })
            })
    }
}

const getAllComment = ({ slug, page }, callback = () => { }) => {
    return (dispatch) => {
        dispatch({
            type: types.GET_ALL_COMMENT,
        })
        bookAPI.getAllCommentPerBook(slug, page)
            .then((rs) => {
                if (rs.status === 200) {
                    dispatch({
                        type: types.GET_ALL_COMMENT_SUCCESS,
                        payload: rs.data
                    })
                    callback()
                }
            })
            .catch(e => {
                dispatch({
                    type: types.GET_ALL_COMMENT_FAIL,
                })
            })
    }
}

const getRatingStatistics = (slug, callback = () => { }) => {
    return (dispatch) => {
        bookAPI.getRatingStatistics(slug)
            .then((rs) => {
                if (rs.status === 200) {
                    dispatch({
                        type: types.GET_RATING_STATISTICS,
                        payload: rs.data
                    })
                    callback()
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
}

const createRating = (slug, data, callback = () => { }) => {
    return (dispatch) => {
        // dispatch({
        //     type: types.CREATE_RATING,
        // })
        console.log({ data: data.user });
        bookAPI.createRating(slug, { rating: data.rating, comment: data.comment })
            .then((rs) => {
                if (rs.status === 201) {
                    dispatch({
                        type: types.CREATE_RATING_SUCCESS,
                        payload: { ...rs.data, user: data.user }
                    })
                    useNotification.Success({
                        title: "ĐÁNH GIÁ THÀNH CÔNG!",
                        message: `Cảm ơn bạn đã đánh giá sách!`
                    })
                    callback()
                }
            })
            .catch(e => {
                // dispatch({
                //     type: types.CREATE_RATING_FAIL,
                // })
                useNotification.Error({
                    title: "ĐÁNH GIÁ LỖI!",
                    message: `Đã có lỗi xảy ra, vui lòng thử lại!`
                })
            })
    }
}

const getBooksFromListId = (data, callback = () => { }) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LOADING_AI,
            payload: true
        })
        bookAPI.getBooksFromListId(data)
            .then((rs) => {
                if (rs.status === 200) {
                    dispatch({
                        type: types.GET_LIST_BOOKS_FROM_BOOK_ID,
                        payload: rs.data
                    })
                    dispatch({
                        type: types.SET_LOADING_AI,
                        payload: false
                    })
                    callback(rs.data)
                }
            })
            .catch(e => {
                console.log(e);
                dispatch({
                    type: types.SET_LOADING_AI,
                    payload: false
                })
            })
    }
}
const getAllBookId = (callback = () => { }) => {
    return (dispatch) => {
        bookAPI.getAllBookId()
            .then((rs) => {
                if (rs.status === 200) {
                    dispatch({
                        type: types.GET_ALL_BOOK_ID,
                        payload: rs.data.list_id
                    })
                    callback(rs.data.list_id)
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
}

const setLoadingAI = (loading) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LOADING_AI,
            payload: loading
        })
    }
}

export {
    getAllGenre,
    getListProduct,
    deleteGenre,
    addGenre,
    getAllComment,
    createRating,
    getRatingStatistics,
    getBooksFromListId,
    getAllBookId,
    setLoadingAI,
    getAllAuthors,
    getListProductSearch
}