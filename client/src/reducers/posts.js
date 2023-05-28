//here state is posts array
import { FETCH_POST, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, COMMENT } from '../constants/actionTypes';

export default (state = { post: {}, isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_POST:
            console.log(action.payload);
            return { ...state, post: action.payload };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            console.log(action.payload);
            return { ...state, posts: action.payload.data };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case COMMENT:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        default:
            return state;
    }
}