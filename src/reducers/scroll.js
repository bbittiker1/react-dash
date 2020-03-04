import {
	FETCH_SCROLL_FAIL,
	FETCH_SCROLL_REQ,
	FETCH_SCROLL_SUCCESS
} from "../actions/scroll";

export default function scroll(
	state = {
		isLoading: false,
		error: null,
		users: [],
		page: 0
	},
	action
) {
	switch (action.type) {
	case FETCH_SCROLL_REQ:
		return Object.assign({}, state, {
			isLoading: true,
			error: null,
			// users: state.users
		});
	case FETCH_SCROLL_SUCCESS:
		return Object.assign({}, state, {
			isLoading: false,
			users: [...state.users, ...action.users],
			page: state.page + 1,
			error: null
		});
	case FETCH_SCROLL_FAIL:
		return Object.assign({}, state, {
			isLoading: false,
			error: action.error,
			// users: state.users
		});
	default:
		return state;
	}
}
