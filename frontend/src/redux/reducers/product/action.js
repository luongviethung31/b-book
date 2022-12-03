import * as types from './types'
import genreAPI from 'api/genreAPI'
import useNotification from 'hooks/notification'

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

const deleteGenre = (data) => {
    return (dispatch) => {
        genreAPI.deleteGenre(data.slug)
        .then(rs => {
            if(rs.status === 204) {
                dispatch({
                    type: types.DELETE_GENRE,
                    payload: data.slug,
                })
                useNotification.Success({
                    title: "XÓA THÀNH CÔNG!",
                    message: `Đã xóa ${data.title}`
                })
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

const addGenre = (data, callback = () => {}) => {
    return (dispatch) => {
        genreAPI.addGenre(data)
        .then(rs => {
            if(rs.status === 201) {
                dispatch({
                    type: types.ADD_GENRE,
                    payload: rs.data
                })
                useNotification.Success({
                    title: "THEEM THÀNH CÔNG!",
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



const getListProductGenre = (slug, callback = () => { }) => {
    return (dispatch) => {
        dispatch({
            type: types.GET_LIST_PRODUCT_GENRE,
        })
        genreAPI.retrieveGenre(slug)
            .then((rs) => {
                if (rs.status === 200) {
                    console.log(rs);
                    dispatch({
                        type: types.GET_LIST_PRODUCT_GENRE_SUCCESS,
                        payload: rs.data
                    })
                    callback()
                }
            })
            .catch(e => {
                dispatch({
                    type: types.GET_LIST_PRODUCT_GENRE_FAIL,
                })
            })
    }
}

export {
    getAllGenre,
    getListProductGenre,
    deleteGenre,
    addGenre
}