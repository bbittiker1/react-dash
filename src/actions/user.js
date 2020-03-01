import {clearUserSession, setUserSession} from "../selectors";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

function requestLogin() {
	return {
		type: LOGIN_REQUEST,
		// isFetching: true,
		// isAuthenticated: false,
		// userId: null,
		// creds,
	};
}

// function loginError(data) {
// 	return {
// 		type: LOGIN_FAILURE,
// 		isFetching: false,
// 		isAuthenticated: false,
// 		userId: null,
// 		username: null,
// 		error: data
// 	};
// }

function requestLogout() {
	return {
		type: LOGOUT_REQUEST,
		// isFetching: true,
		// isAuthenticated: true,
	};
}

export function receiveLogout() {
	return {
		type: LOGOUT_SUCCESS,
		// isFetching: false,
		// isAuthenticated: false,
		// userId: null,
		// username: null
	};
}

// Logs the user out
export function logoutUser() {
	return dispatch => {
		dispatch(requestLogout());

		clearUserSession(); // TODO: HERE OR IN REDUCER?

		dispatch(receiveLogout());
	};
}

export const loginUser = (creds) => {

	return dispatch => {
		dispatch(requestLogin(creds));

		return new Promise((resolve) => {
			setTimeout(() => resolve(), 2000);
		}).then(() => {
			const user = {
				id: 1,
				username: "user@acme.com",
				email_confirmed_at: null,
				first_name: "",
				last_name: "",
				is_active: true,
				has_logged_in: false,
				modified_at: "1"
			};

			setUserSession(user, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpmY…4MjV9.Jd1Trqu6izHq2R3uw4enrDlQKG4mzZdipSMdYQD_9JM");

			dispatch({
				type: LOGIN_SUCCESS,
				payload: {
					user: {
						id: 1,
						username: "user@acme.com"
					}
				}
			});
		});
	};
};
