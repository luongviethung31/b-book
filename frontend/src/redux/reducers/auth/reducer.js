import * as types from './types'
const initialState = {
    userInfo: {}
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
        default:
            return state
    }
}
export default reducer