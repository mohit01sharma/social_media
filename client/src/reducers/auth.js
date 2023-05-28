import { AUTH, LOGOUT } from '../constants/actionTypes';

export default (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            // console.log("hi")
            localStorage.setItem('profile', JSON.stringify(action.payload));
            return { ...state, authData: action.payload };
        case LOGOUT:
            // console.log("hi2")
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
}