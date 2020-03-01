import { APIS } from "../constants/index";
import axiosInstance from "./index";

export const FETCH_FIREWALL_BASELINES_REQ = "FETCH_FIREWALL_BASELINES_REQ";
export const FETCH_FIREWALL_BASELINES_SUCCESS = "FETCH_FIREWALL_BASELINES_SUCCESS";
export const FETCH_FIREWALL_BASELINES_FAIL = "FETCH_FIREWALL_BASELINES_FAIL";

function requestFetchFirewallBaselines() {
	return {
		type: FETCH_FIREWALL_BASELINES_REQ,
	};
}

function fetchFetchFirewallBaselinesSuccess(payload) {
	return {
		type: FETCH_FIREWALL_BASELINES_SUCCESS,
		payload
	};
}

function fetchFetchFirewallBaselinesFailure(error) {
	return {
		type: FETCH_FIREWALL_BASELINES_FAIL,
		error: error,
	};
}

export const fetchFirewallBaselines = () => dispatch => {
	dispatch(requestFetchFirewallBaselines());

	return new Promise((resolve, reject) => {
		return axiosInstance().get(APIS.firewallBaselines)
			.then(response => {
				dispatch(fetchFetchFirewallBaselinesSuccess(response.data));
				resolve();
			})
			.catch(error => {
				dispatch(fetchFetchFirewallBaselinesFailure(error.response));
				reject(error.response);
			});
	});
};
