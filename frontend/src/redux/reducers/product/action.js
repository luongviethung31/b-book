import * as types from './types'
import genreAPI from 'api/genreAPI'

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
    getListProductGenre
}