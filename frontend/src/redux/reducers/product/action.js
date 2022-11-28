import * as types from './types' 
import genreAPI  from 'api/genreAPI'

const getAllGenre = (callback = () => {}) => {
    return (dispatch) => {
        genreAPI.getAllGenre()
        .then((rs) => {
            if(rs.status === 200) {
                dispatch({
                    type: types.GET_ALL_GENRE,
                    payload: rs.data
                })
            }
        })
       .catch(e => console.log(e))
        callback()
    }
}

export {
    getAllGenre
}