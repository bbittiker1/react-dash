import {
	FETCH_WIDGETS_FAIL,
	FETCH_WIDGETS_REQ,
	FETCH_WIDGETS_SUCCESS
} from "../actions/widgets";

export default function widgets(
	state = {
		isFetching: true,
		isFetchingPick: false,
		isFetchingUnpick: false,
		isFetchingBaseline: false,
	},
	action
) {
	switch (action.type) {
	case FETCH_WIDGETS_REQ:
		return Object.assign({}, state, {
			isFetching: true,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			error: null,
			widgets: []
		});
	case FETCH_WIDGETS_SUCCESS:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			widgets: action.widgets.default.data,
			error: null
		});
	case FETCH_WIDGETS_FAIL:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			error: action.error,
			widgets: []
		});
	default:
		return state;
	}
}
