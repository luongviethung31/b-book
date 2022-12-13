import { type } from '@testing-library/user-event/dist/type'
import * as types from './types'
const initialState = {
    listGenre: [],
    listProduct: [],
    genreTitle:'',
    listComment:{count:0, results:[]},
    ratingStatistics:[],
    listBookReccomend:[],
    listBookId: [],
    loading: false,
    loadingPage: false,
    loadingAI: false,
    listAuthors: [],
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
        case  types.GET_ALL_AUTHOR: {
            return {
                ...state,
               loading: true
            }
        }
        case  types.GET_ALL_AUTHOR_SUCCESS: {
            return {
                ...state,
                listAuthors: action.payload,
                loading: false
            }
        }
        case  types.GET_ALL_AUTHOR_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case  types.GET_LIST_PRODUCT: {
            return {
                ...state,
                loadingPage: true,
                loading: true,
            }
        }
        case  types.GET_LIST_PRODUCT_SUCCESS: {
            return {
                ...state,
                // genreTitle: action.payload.title,
                listProduct: action.payload,
                loadingPage: false,
                loading: false
            }
        }
        case  types.GET_LIST_PRODUCT_FAIL: {
            return {
                ...state,
                loadingPage: false,
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
            let list = [...state.listGenre]
            list.push(action.payload)
            return {
                ...state,
                listGenre: list,
            }
        }
        
        case types.GET_ALL_COMMENT: {
            return {
                ...state,
                loadingPage: true
            }
        }
        case types.GET_ALL_COMMENT_FAIL: {
            return {
                ...state,
                loadingPage: false
            }
        }
        case types.GET_ALL_COMMENT_SUCCESS: {
            return {
                ...state,
                listComment: {...action.payload},
                loadingPage: false
            }
        }
        case types.CREATE_RATING: {
            return {
                ...state,
                loading: true
            }
        }
        case types.CREATE_RATING_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case types.CREATE_RATING_SUCCESS: {
            const itemRating = {...action.payload}
            const RatingTemp = [...state.ratingStatistics]
            RatingTemp.count += 1 
            RatingTemp.forEach((item) => {
                if(item.rating === itemRating.rating) {
                    item.quantity += 1
                }
            })
            state.listComment.results.unshift(action.payload)
            return {
                ...state,
                listComment: {...state.listComment,count: state.listComment.count +1},
                ratingStatistics: [...RatingTemp],
                loading: false
            }
        }
        // case types.CREATE_RATING_SUCCESS: {

        //     return {
        //         ...state,
        //         ratingStatistics: [...action.payload],
        //         loading: false
        //     }
        // }
        case types.GET_RATING_STATISTICS: {
            return {
                ...state,
                ratingStatistics: [...action.payload],
                loading: false
            }
        }
        case types.GET_LIST_BOOKS_FROM_BOOK_ID: {
            return {
                ...state,
                listBookReccomend: [...action.payload],
            }
        }

        case types.GET_ALL_BOOK_ID: {
            let allId = [...action.payload]
            return {
                ...state,
                listBookId: allId.map(item => item.id),
            }
        }

        case types.SET_LOADING_AI:
            return {
                ...state,
                loadingAI: action.payload
            }
        
        default:
            return state
    }
}
export default reducer