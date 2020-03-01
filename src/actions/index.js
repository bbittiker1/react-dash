import axios from "axios";

import appConfig from "../config";
import { getAuthToken } from "../selectors";
import Toast from "../components/Toast/Toast";

const NETWORK_ERROR_MSG = "Network error occurred. Failed to connect to API server.";

const _axiosInstance = axios.create({
	baseURL: appConfig.api_server_url,
	timeout: 15000,
});

_axiosInstance.interceptors.request.use(
	request => requestHandler(request)
);

_axiosInstance.interceptors.response.use(
	response => successHandler(response),
	error => errorHandler(error)
);

const requestHandler = (request) => {
	request.headers["Authorization"] = `Bearer ${getAuthToken()}`;
	return request;
};

const errorHandler = (error) => {
	// console.log("error response: " + error.response);
	// console.log("error request: " + error.request);
	if(!error.response) {
		// No response from server.
		Toast({ "type": "error", "error": NETWORK_ERROR_MSG });
	}
	return Promise.reject({ ...error });
};

const successHandler = (response) => {
	// console.log("error response: " + error.response);
	return response;
};

export default () => {
	return _axiosInstance;
};
