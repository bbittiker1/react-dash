import * as fakeData from "../test/data/widgets.json";

export const FETCH_WIDGETS_REQ = "FETCH_WIDGETS_REQ";
export const FETCH_WIDGETS_SUCCESS = "FETCH_WIDGETS_SUCCESS";
export const FETCH_WIDGETS_FAIL = "FETCH_WIDGETS_FAIL";

function requestFetchWidgets() {
	return {
		type: FETCH_WIDGETS_REQ,
	};
}

function fetchWidgetsSuccess(widgets) {
	return {
		type: FETCH_WIDGETS_SUCCESS,
		widgets,
	};
}

export const fetchWidgets = () => dispatch => {
	dispatch(requestFetchWidgets());

	return new Promise((resolve, reject) => {
		dispatch(fetchWidgetsSuccess(fakeData));
		resolve(fakeData);
	});
};
