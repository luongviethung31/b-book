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

export {
    setAccountInfo,
    resetAccountInfo
}