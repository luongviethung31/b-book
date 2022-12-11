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
            type: types.SET_LOADING_AI,
            payload: loading
        })
    }
}

const handleShowLoginModal = (isShow) => {
    return (dispatch) => {
        dispatch({
            type: types.HANDLE_SHOW_LOGIN,
            payload: isShow
        })
    }
}

export {
    setAccountInfo,
    resetAccountInfo,
    setLoading,
    handleShowLoginModal
}