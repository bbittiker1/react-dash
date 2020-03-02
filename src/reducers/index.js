import { combineReducers } from "redux";
import auth from "./auth";
import navigation from "./navigation";
import widgets from "./widgets";

export default combineReducers({
	auth,
	navigation,
	widgets
});

export const getAuth = (state) => state.auth;
