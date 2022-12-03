import * as types from './types'
const initialState = {
    listGenre: [],
    listProduct: [],
    genreTitle:'',
    loading: false
  }
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case  types.GET_ALL_GENRE: {
            return {
                ...state,
               loading: true
            }
        }
        case  types.GET_ALL_GENRE_SUCCESS: {
            return {
                ...state,
                listGenre: action.payload,
                loading: false
            }
        }
        case  types.GET_ALL_GENRE_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case  types.GET_LIST_PRODUCT_GENRE: {
            return {
                ...state,
               loading: true
            }
        }
        case  types.GET_LIST_PRODUCT_GENRE_SUCCESS: {
            return {
                ...state,
                genreTitle: action.payload.title,
                listProduct: action.payload.books,
                loading: false
            }
        }
        case  types.GET_LIST_PRODUCT_GENRE_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case  types.DELETE_GENRE: {
            return {
                ...state,
                listGenre: state.listGenre.filter((item) => item.slug !== action.payload)
            }
        }
        case  types.ADD_GENRE: {
            console.log(action.payload)
            let list = [...state.listGenre]
            list.push(action.payload)
            return {
                ...state,
                listGenre: list,
            }
        }
        default:
            return state
    }
}
export default reducer