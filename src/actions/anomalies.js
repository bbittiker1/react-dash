import { APIS } from "../constants/index";
import axiosInstance from "./index";

import * as fakeData from "../test/data/widgets.json";


export const FETCH_ANOMALIES_REQ = "FETCH_ANOMALIES_REQ";
export const FETCH_ANOMALIES_SUCCESS = "FETCH_ANOMALIES_SUCCESS";
export const FETCH_ANOMALIES_FAIL = "FETCH_ANOMALIES_FAIL";

export const FETCH_ANOMALIES_PICK_REQ = "FETCH_ANOMALIES_PICK_REQ";
export const FETCH_ANOMALIES_PICK_SUCCESS = "FETCH_ANOMALIES_PICK_SUCCESS";
export const FETCH_ANOMALIES_PICK_FAIL = "FETCH_ANOMALIES_PICK_FAIL";

export const FETCH_ANOMALIES_UNPICK_REQ = "FETCH_ANOMALIES_UNPICK_REQ";
export const FETCH_ANOMALIES_UNPICK_SUCCESS = "FETCH_ANOMALIES_UNPICK_SUCCESS";
export const FETCH_ANOMALIES_UNPICK_FAIL = "FETCH_ANOMALIES_UNPICK_FAIL";

export const FETCH_ANOMALIES_ADD_BASELINE_REQ = "FETCH_ANOMALIES_ADD_BASELINE_REQ";
export const FETCH_ANOMALIES_ADD_BASELINE_SUCCESS = "FETCH_ANOMALIES_ADD_BASELINE_SUCCESS";
export const FETCH_ANOMALIES_ADD_BASELINE_FAIL = "FETCH_ANOMALIES_ADD_BASELINE_FAIL";

export const FETCH_MARK_ANOMALY_REQ = "FETCH_MARK_ANOMALY_REQ";
export const FETCH_MARK_ANOMALY_SUCCESS = "FETCH_MARK_ANOMALY_SUCCESS";
export const FETCH_MARK_ANOMALY_FAIL = "FETCH_MARK_ANOMALY_FAIL";

function requestFetchAnomalies() {
	return {
		type: FETCH_ANOMALIES_REQ,
	};
}

function requestFetchPickAnomalies() {
	return {
		type: FETCH_ANOMALIES_PICK_REQ,
	};
}
function requestFetchUnpickAnomalies() {
	return {
		type: FETCH_ANOMALIES_UNPICK_REQ,
	};
}

function requestFetchAddBaseline() {
	return {
		type: FETCH_ANOMALIES_ADD_BASELINE_REQ,
	};
}

function requestFetchMarkAnomaly() {
	return {
		type: FETCH_MARK_ANOMALY_REQ,
	};
}

// function fetchMarkAnomalySuccess(anomalies) {
//   return {
//     type: FETCH_MARK_ANOMALY_SUCCESS,
//     anomalies,
//   };
// }

function fetchMarkAnomalyFailure(data) {
	return {
		type: FETCH_MARK_ANOMALY_FAIL,
		error: data,
	};
}

function fetchAnomaliesSuccess(anomalies) {
	return {
		type: FETCH_ANOMALIES_SUCCESS,
		anomalies,
	};
}

function fetchAnomaliesFailure(data) {
	return {
		type: FETCH_ANOMALIES_FAIL,
		error: data,
	};
}

function fetchAddBaselineFailure(data) {
	return {
		type: FETCH_ANOMALIES_ADD_BASELINE_FAIL,
		error: data,
	};
}

export const fetchWidgets = () => dispatch => {
	dispatch(requestFetchAnomalies());

	return new Promise((resolve, reject) => {
		dispatch(fetchAnomaliesSuccess(fakeData));
		resolve(fakeData);
	});
};


export const fetchAnomalies = () => dispatch => {
	dispatch(requestFetchAnomalies());

	return new Promise((resolve, reject) => {
		return axiosInstance().get(APIS.changelog)
			.then(response => {
				dispatch(fetchAnomaliesSuccess(response.data));
				resolve();
			})
			.catch(error => {
				dispatch(fetchAnomaliesFailure(error.response));
				reject(error.response);
			});
	});
};

export const unpickAnomaly = (anomaly) => dispatch => {
	const data = {
		device_id: anomaly.device_id,
		device_type: anomaly.device_type,
		user_id: anomaly.user_id,
		anomaly_id: anomaly.id
	};

	return new Promise((resolve, reject) => {
		dispatch(requestFetchUnpickAnomalies());

		return axiosInstance().post(APIS.unpickAnomaly, data)
			.then(() => {
				dispatch(fetchAnomalies());
				resolve();
			})
			.catch(error => {
				dispatch(fetchAnomaliesFailure(error.response));
				reject(error.response);
			});
	});
};

export const pickAnomaly = (anomaly, userId) => dispatch => {
	const data = {
		device_id: anomaly.device_id,
		device_type: anomaly.device_type,
		user_id: userId,
		anomaly_id: anomaly.id
	};

	return new Promise((resolve, reject) => {
		dispatch(requestFetchPickAnomalies());

		return axiosInstance().post(APIS.pickAnomaly, data)
			.then(() => {
				dispatch(fetchAnomalies());
				resolve();
			})
			.catch(error => {
				dispatch(fetchAnomaliesFailure(error.response));
				reject(error.response);
			});
	});
};

export const addBaseline = (anomaly, userId) => dispatch => {
	const data = {
		device_id: anomaly.device_id,
		device_type: anomaly.device_type,
		user_id: userId,
		avalues: anomaly.avalues
	};

	return new Promise((resolve, reject) => {
		dispatch(requestFetchAddBaseline());

		axiosInstance().post(APIS.addBaseline, data)
			.then(() => {
				dispatch(fetchAnomalies());
				resolve();
			})
			.catch(error => {
				dispatch(fetchAddBaselineFailure(error.response));
				reject(error.response);
			});
	});
};

export const markAnomaly = anomaly => dispatch => {
	const data = {
		device_type: anomaly.device_type,
		user_id: anomaly.user_id,
		id: anomaly.id
	};
    
	return new Promise((resolve, reject) => {
		dispatch(requestFetchMarkAnomaly());

		axiosInstance().post(APIS.markAnomaly, data)
			.then( () => {
				dispatch(fetchAnomalies());
				resolve();
			})
			.catch(error => {
				dispatch(fetchMarkAnomalyFailure(error.response));
				reject(error.response);
			});
	});
};



