import {getIsAuthenticated} from "../selectors";
import {Redirect, Route} from "react-router";
import React from "react";
import {logoutUser} from "../actions/user";

const PrivateRoute = ({dispatch, component, ...rest }) => {
	if (getIsAuthenticated()) {
        return ( // eslint-disable-line
			<Route {...rest} render={props => (React.createElement(component, props))}/>
		);
	} else {
		dispatch(logoutUser());
		return (<Redirect to="/login"/>);
	}
};

export default PrivateRoute;
