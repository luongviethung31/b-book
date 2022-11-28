import * as types from './types'
const initialState = {
    listGenre: []
  }
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case  types.GET_ALL_GENRE: {
            return {
                ...state,
                listGenre: action.payload
            }
        }
        default:
            return state
    }
}
export default reducer