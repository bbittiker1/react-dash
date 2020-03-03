import * as fakeData from "../test/data/widgets.json";

export const FETCH_SCROLL_REQ = "FETCH_SCROLL_REQ";
export const FETCH_SCROLL_SUCCESS = "FETCH_SCROLL_SUCCESS";
export const FETCH_SCROLL_FAIL = "FETCH_SCROLL_FAIL";

function requestFetchScroll() {
	return {
		type: FETCH_SCROLL_REQ,
	};
}

function fetchScrollSuccess(widgets) {
	return {
		type: FETCH_SCROLL_SUCCESS,
		widgets,
	};
}

export const fetchScroll = () => dispatch => {
	dispatch(requestFetchScroll());

	return new Promise((resolve, reject) => {
		dispatch(fetchScrollSuccess(fakeData));
		resolve(fakeData);
	});
};
