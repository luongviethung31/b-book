import * as types from './types'

const setAccountInfo = (info, callback = ()=> {}) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_ACCOUNT_INFO,
            payload: info
        })
        callback()
    }
}

const resetAccountInfo = (callback = ()=> {}) => {
    return (dispatch) => {
        dispatch({
            type: types.RESET_ACCOUNT_INFO,
        })
        callback()
    }
}

const setLoading = (loading) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: loading
        })
    }
}

export {
    setAccountInfo,
    resetAccountInfo,
    setLoading
}