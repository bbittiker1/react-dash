import { APIS } from "../constants/index";
import axiosInstance from "./index";

export const FETCH_CONVICTED_REQUEST = "FETCH_CONVICTED_REQUEST";
export const FETCH_CONVICTED_SUCCESS = "FETCH_CONVICTED_SUCCESS";
export const FETCH_CONVICTED_FAIL = "FETCH_CONVICTED_FAIL";


function requestFetchConvicted() {
	return {
		type: FETCH_CONVICTED_REQUEST,
	};
}

function fetchConvictedSuccess(payload) {
	return {
		type: FETCH_CONVICTED_SUCCESS,
		payload,
	};
}

function fetchConvictedFailure(data) {
	return {
		type: FETCH_CONVICTED_FAIL,
		error: data,
	};
}

export const fetchConvicted = () => dispatch => {
	dispatch(requestFetchConvicted());

	return new Promise((resolve, reject) => {
		return axiosInstance().get(APIS.convicted)
			.then(response => {
				dispatch(fetchConvictedSuccess(response.data));
				resolve();
			})
			.catch(error => {
				dispatch(fetchConvictedFailure(error.response));
				reject(error.response);
			});
	});
};
