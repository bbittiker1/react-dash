import { getAuthToken } from "../selectors";
import {
	LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
} from "../actions/user";

const token = getAuthToken();

export default function auth(state = {
	isFetching: false,
	isAuthenticated: !!token,
}, action) {
	switch (action.type) {
	case LOGIN_REQUEST:
		return Object.assign({}, state, {
			isFetching: true,
			isAuthenticated: false,
			errorMessage: "",
			error: null
		});
	case LOGIN_SUCCESS:

		const o =  Object.assign({}, state, {
			isFetching: false,
			isAuthenticated: true,
			userId: action.payload.user.id,
			username: action.payload.user.username,
			errorMessage: "",
			error: null
		});
		return o;
	case LOGIN_FAILURE:
		return Object.assign({}, state, {
			isFetching: false,
			isAuthenticated: false,
			error: action.error,
			// userId: null,
			// username: null,
		});
	case LOGOUT_SUCCESS:
		return Object.assign({}, state, {
			isAuthenticated: false,
			errorMessage: "",
			userId: null,
			username: null,
		});
	default:
		return state;
	}
}
