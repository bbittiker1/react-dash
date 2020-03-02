import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { ConfirmProvider } from "material-ui-confirm";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

import LayoutComponent from "../components/Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/login/Login";
import { theme } from "../styles/theme.js";

import Config from "../config";
import { ENVIRONMENTS } from "../constants/index";


const ToastCloseButton = ({closeToast}) => <i onClick={closeToast} className="fa fa-times"/>;

class App extends React.Component {
	constructor(props) {
		super(props);

		if(Config.environment !== ENVIRONMENTS.production) {
			console.info("Config: ", Config);
		}

		// TODO: Update global alerts...
		// const history = createBrowserHistory();
		// const { dispatch } = this.props;
		// history.listen((location, action) => {
		//     // console.log(location, action);
		//     // clear alert on location change
		//     // dispatch(alertActions.clear());
		// });
	}

	static get propTypes() {
		return {
			dispatch: PropTypes.func.isRequired,
			closeToast: PropTypes.func,
			isAuthenticated: PropTypes.bool
		};
	}

	// static defaultProps = {
	// 	closeToast: () => {},
	// };

	render() {
		return (
			<ThemeProvider theme={theme}>
				<div>
					<ToastContainer
						autoClose={5000}
						hideProgressBar
						closeButton={ <ToastCloseButton/> }
					/>
					<ConfirmProvider>
						<HashRouter>
							<Switch>
								<Route path="/" exact render={() => <Redirect to="/app/main"/>}/>
								<Route path="/app" exact render={() => <Redirect to="/app/main"/>}/>
								<PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent}/>
								<Route path="/documentation" exact render={() => <Redirect to="/documentation/getting-started/overview"/>}/>
								<Route path="/login" exact component={ Login } />
							</Switch>
						</HashRouter>
					</ConfirmProvider>
				</div>
			</ThemeProvider>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
