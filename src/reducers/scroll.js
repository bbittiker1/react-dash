import {
	FETCH_SCROLL_FAIL,
	FETCH_SCROLL_REQ,
	FETCH_SCROLL_SUCCESS
} from "../actions/scroll";

export default function scroll(
	state = {
		isFetching: true,
		isFetchingPick: false,
		isFetchingUnpick: false,
		isFetchingBaseline: false,
		error: null
	},
	action
) {
	switch (action.type) {
	case FETCH_SCROLL_REQ:
		return Object.assign({}, state, {
			isFetching: true,
			error: null,
			widgets: []
		});
	case FETCH_SCROLL_SUCCESS:
		return Object.assign({}, state, {
			isFetching: false,
			widgets: action.widgets.default.data,
			error: null
		});
	case FETCH_SCROLL_FAIL:
		return Object.assign({}, state, {
			isFetching: false,
			error: action.error,
			widgets: []
		});
	default:
		return state;
	}
}
