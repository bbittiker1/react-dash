import config from "./config";
// import jwt from "jsonwebtoken";

import {JWT_TOKEN, CURRENT_USER, CURRENT_USER_ID} from "./constants";

const isAuthenticated = (token) => {
	if (!token) {
		return false;
	}

	// We check if app runs with backend mode
	if (!config.isBackend && token) {
		return true;
	}

	// const date = new Date().getTime() / 1000;
	// const data = jwt.decode(token);
	return true;
};

export const getIsAuthenticated = () => {
	return isAuthenticated(sessionStorage.getItem(JWT_TOKEN));
};

export const getAuthToken = () => {
	return sessionStorage.getItem(JWT_TOKEN);
};

export const checkAuth = () => {
	const token = getAuthToken();

	if (!isAuthenticated(token)) {
		return Promise.reject();
	}

	return Promise.resolve();
};

export const getCurrentUsername = () => {
	const currUser = JSON.parse(sessionStorage.getItem(CURRENT_USER));

	return currUser ? currUser.username : "";
};

export const getCurrentUser = () => {
	const currUser = JSON.parse(sessionStorage.getItem(CURRENT_USER));

	return currUser ? currUser : "";
};

export const getCurrentUserId = () => {
	const currUserId = JSON.parse(sessionStorage.getItem(CURRENT_USER_ID));

	return currUserId ? currUserId : "";
};

export const clearUserSession = () => {
	sessionStorage.removeItem(JWT_TOKEN);
	sessionStorage.removeItem(CURRENT_USER);
	sessionStorage.removeItem(CURRENT_USER_ID);

	document.cookie = "id_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const setUserSession = (user, token) => {
	sessionStorage.setItem(JWT_TOKEN, token);
	sessionStorage.setItem(CURRENT_USER, JSON.stringify(user));
	sessionStorage.setItem(CURRENT_USER_ID, user.id);

	// TODO: SESSION COOKIE HTTP ONLY
};

