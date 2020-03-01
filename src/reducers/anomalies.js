import {
	FETCH_ANOMALIES_REQ,
	FETCH_ANOMALIES_SUCCESS,
	FETCH_ANOMALIES_FAIL,
	FETCH_ANOMALIES_PICK_FAIL,
	FETCH_ANOMALIES_PICK_REQ,
	FETCH_ANOMALIES_PICK_SUCCESS,
	FETCH_ANOMALIES_UNPICK_FAIL,
	FETCH_ANOMALIES_UNPICK_REQ,
	FETCH_ANOMALIES_UNPICK_SUCCESS,
	FETCH_ANOMALIES_ADD_BASELINE_FAIL,
	FETCH_ANOMALIES_ADD_BASELINE_REQ,
	FETCH_ANOMALIES_ADD_BASELINE_SUCCESS,
	FETCH_MARK_ANOMALY_FAIL,
	FETCH_MARK_ANOMALY_REQ,
	FETCH_MARK_ANOMALY_SUCCESS,
} from "../actions/anomalies";

export default function anomalies(
	state = {
		isFetching: true,
		isFetchingPick: false,
		isFetchingUnpick: false,
		isFetchingBaseline: false,
		isFetchingMarkAnomaly: false
	},
	action
) {
	switch (action.type) {
	case FETCH_ANOMALIES_REQ:
		return Object.assign({}, state, {
			isFetching: true,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			error: null,
			anomalies: []
		});
	case FETCH_ANOMALIES_SUCCESS:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			anomalies: action.anomalies,
			error: null
		});
	case FETCH_ANOMALIES_FAIL:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			error: action.error,
			anomalies: []
		});
	case FETCH_ANOMALIES_PICK_REQ:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: true,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			error: null,
			anomalies: state.anomalies
		});
	case FETCH_ANOMALIES_PICK_SUCCESS:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			anomalies: action.anomalies,
			error: null
		});
	case FETCH_ANOMALIES_PICK_FAIL:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingUnpick: false,
			isFetchingPick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			error: action.error,
			anomalies: []
		});
	case FETCH_ANOMALIES_UNPICK_REQ:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingUnpick: true,
			isFetchingPick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			error: null,
			anomalies: state.anomalies
		});
	case FETCH_ANOMALIES_UNPICK_SUCCESS:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			anomalies: action.anomalies,
			error: null
		});
	case FETCH_ANOMALIES_UNPICK_FAIL:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			error: action.error,
			anomalies: []
		});
	case FETCH_ANOMALIES_ADD_BASELINE_REQ:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingUnpick: false,
			isFetchingPick: false,
			isFetchingBaseline: true,
			isFetchingMarkAnomaly: false,
			error: null,
			anomalies: state.anomalies
		});
	case FETCH_ANOMALIES_ADD_BASELINE_SUCCESS:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			anomalies: action.anomalies,
			error: null
		});
	case FETCH_ANOMALIES_ADD_BASELINE_FAIL:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			error: action.error,
			anomalies: state.anomalies
		});
	case FETCH_MARK_ANOMALY_REQ:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingUnpick: false,
			isFetchingPick: false,
			isFetchingBaseline: true,
			isFetchingMarkAnomaly: true,
			error: null,
			anomalies: state.anomalies
		});
	case FETCH_MARK_ANOMALY_SUCCESS:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			anomalies: action.anomalies,
			error: null
		});
	case FETCH_MARK_ANOMALY_FAIL:
		return Object.assign({}, state, {
			isFetching: false,
			isFetchingPick: false,
			isFetchingUnpick: false,
			isFetchingBaseline: false,
			isFetchingMarkAnomaly: false,
			error: action.error,
			anomalies: state.anomalies
		});
	default:
		return state;
	}
}
