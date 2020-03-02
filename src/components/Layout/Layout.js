import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import ChangelogAppBar from "../AppBar/AppBar";
import ChangelogSideBar from "../Sidebar/Sidebar";
import Dashboard from "../../pages/dashboard/Dashboard";
import Widgets from "../../pages/widgets/Widgets";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
	},
	hide: {
		display: "none",
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function Layout() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<ChangelogAppBar />
			<ChangelogSideBar />
			<main className={classes.content}>
				<div className={classes.toolbar} />

				<Switch>
					<Route path="/app/main" exact component={Dashboard} />
					<Route path="/app/widgets/changelog" exact component={Widgets} />
				</Switch>
			</main>
		</div>
	);
}

connect(null, null)(Layout);
