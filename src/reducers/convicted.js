import {
	FETCH_CONVICTED_REQUEST,
	FETCH_CONVICTED_SUCCESS,
	FETCH_CONVICTED_FAIL,

} from "../actions/convicted.js";

export default function convicted (
	state = {
		isFetching: true,
	},
	action
) {
	switch (action.type) {
	case FETCH_CONVICTED_REQUEST:
		return Object.assign({}, state, {
			isFetching: true,
			error: null,
			payload: []
		});
	case FETCH_CONVICTED_SUCCESS:
		return Object.assign({}, state, {
			isFetching: false,
			payload: action.payload,
			error: null
		});
	case FETCH_CONVICTED_FAIL:
		return Object.assign({}, state, {
			isFetching: false,
			error: action.error,
			payload: []
		});

	default:
		return state;
	}
}
