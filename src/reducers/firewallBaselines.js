import {
	FETCH_FIREWALL_BASELINES_FAIL,
	FETCH_FIREWALL_BASELINES_REQ,
	FETCH_FIREWALL_BASELINES_SUCCESS
} from "../actions/firewall";

export default function firewallBaselines(
	state = {
		isFetching: true,
	},
	action
) {
	switch (action.type) {
	case FETCH_FIREWALL_BASELINES_REQ:
		return Object.assign({}, state, {
			isFetching: true,
			error: null,
			payload: []
		});
	case FETCH_FIREWALL_BASELINES_SUCCESS:
		return Object.assign({}, state, {
			isFetching: false,
			payload: action.payload,
			error: null
		});
	case FETCH_FIREWALL_BASELINES_FAIL:
		return Object.assign({}, state, {
			isFetching: false,
			error: action.error,
			payload: []
		});
	default:
		return state;
	}
}
