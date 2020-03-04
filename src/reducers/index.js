import { combineReducers } from "redux";
import auth from "./auth";
import navigation from "./navigation";
import widgets from "./widgets";
import scroll from "./scroll";

export default combineReducers({
	auth,
	navigation,
	widgets,
	scroll
});

export const getAuth = (state) => state.auth;
