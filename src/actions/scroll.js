import axios from "axios";

import * as fakeData from "../test/data/widgets.json";

export const FETCH_SCROLL_REQ = "FETCH_SCROLL_REQ";
export const FETCH_SCROLL_SUCCESS = "FETCH_SCROLL_SUCCESS";
export const FETCH_SCROLL_FAIL = "FETCH_SCROLL_FAIL";

function requestFetchScroll() {
	return {
		type: FETCH_SCROLL_REQ,
		isLoading: true,
		error: null
	};
}

function fetchScrollSuccess(res) {
	return {
		type: FETCH_SCROLL_SUCCESS,
		users: res,
		isLoading: false,
		error: null
	};
}

function fetchScrollFail(error) {
	return {
		type: FETCH_SCROLL_FAIL,
		error: error
	};
}

export const fetchScroll = (page, perPage) => {

	const myData = fakeData.default.data;

	const from = (page * perPage);
	const to = (page === 0) ? perPage : (from + perPage);

	return (dispatch) => {
		dispatch(requestFetchScroll());

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 1000);
		})
		.then(() => {
			dispatch(fetchScrollSuccess(myData.slice(from, to)));
		})
		.catch(err => {
			dispatch(fetchScrollFail(err));
		})
	};
};

// export const fetchScroll = (page, perPage) => dispatch => {
// 	dispatch(requestFetchScroll());
// 	const url = `https://api.github.com/users?since=${page}&per_page=${perPage}`;
//
// return axios.get(url)
// 	.then(response => {
// 		dispatch(fetchScrollSuccess(page, response));
// 	})
// 	.catch(error => {
// 		dispatch(fetchScrollFail(error.response));
// 	});
// };
