import * as types from './types'
const initialState = {
    userInfo: {},
    loading: false
  }
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case  types.SET_ACCOUNT_INFO: {
            return {
                ...state,
                userInfo: action.payload
            }
        }
        case  types.RESET_ACCOUNT_INFO: {
            return {
                ...state,
                userInfo: {}
            }
        }
        case  types.SET_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        default:
            return state
    }
}
export default reducer