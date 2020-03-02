import { combineReducers } from "redux";
import auth from "./auth";
import navigation from "./navigation";
import anomalies from "./anomalies";

export default combineReducers({
	auth,
	navigation,
	anomalies
});

export const getAuth = (state) => state.auth;
