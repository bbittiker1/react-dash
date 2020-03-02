import React, {useEffect, useState} from "react";
import { withRouter, useHistory} from "react-router-dom";
import { connect, useDispatch, useSelector} from "react-redux";

import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Box,
	makeStyles,
	Container
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import { theme }  from  "../../styles/theme";
import config from "../../config";
import { loginUser } from "../../actions/user";
import { getAuth } from "../../reducers";
import { checkAuth } from "../../selectors";
import Copyright from "../../components/Copyright";
import { META } from "../../constants";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = (props) => {
	const dispatch = useDispatch();
	const classes = useStyles(theme);
	const history = useHistory();
	const isDebug = config.isDebug;

	const auth = useSelector(state => getAuth(state), {});
	const [login, setLogin] = useState(isDebug ? config.debugUsername : "");
	const [password, setPassword] = useState(isDebug ? config.debugPassword : "");

	useEffect(function () {
		checkAuth()
			.then(function () {
				// already authenticated, redirect to the home page
				history.push("/");
			})
			.catch(function () {
				// not authenticated, stay on the login page
			});
	}, [history]);

	if (auth.isAuthenticated) {
		history.push("/");
	}

	const changeLogin = (e) => {
		setLogin(e.target.value);
	};

	const changePassword = (e) => {
		setPassword(e.target.value);
	};

	const doLogin = (e) => {
		dispatch(loginUser({login, password}) );
		e.preventDefault();
	};

	return (
		<Container component="main" maxWidth="xs" style={{marginTop: "100px"}}>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{META.company.name} {META.app.title} Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={(e) => doLogin(e)}>
					<div className={classes.root}>
						{auth.error && (
							<Alert severity="error" variant="filled">{auth.error.data.msg}</Alert>
						)}
					</div>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						id="email"
						label="Email Address"
						autoComplete="email"
						autoFocus
						value={login}
						onChange={ e => changeLogin(e) }
						type="text"
						required
						name="username"
						placeholder="Username"
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={ e => changePassword(e) }
						name="password"
						placeholder="Password"
						value={"password"}
					/>
					<Button type="submit" fullWidth variant="contained" color="primary">
						{!auth.isFetching ? "Login" : (
							<i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
						)}
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2" title="">
                              Forgot password?
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default withRouter(connect(null, null)(Login));
