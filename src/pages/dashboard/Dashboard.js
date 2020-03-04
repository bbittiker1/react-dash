import React from "react";

import { Breadcrumbs, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DevicesNew from "../../components/Charts/DevicesNew/DevicesNew";
import DevicesHousingInsight from "../../components/Charts/DevicesHousingInsight/DevicesHousingInsight";
import List from "../../components/Scroll/List";
import { theme } from "../../styles/theme";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 140,
		width: 100,
	},
	control: {
		padding: theme.spacing(2),
	},
}));

export default function Dashboard() {
	const classes = useStyles(theme);

	return (
		<div className={classes.root}>
			<div style={{marginBottom: "0px"}}>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="textPrimary">Dashboard</Typography>
				</Breadcrumbs>
			</div>

			<Grid container className={classes.root} spacing={4}>
				<Grid item xs={12} sm={8} md={6} lg={4}>
					<DevicesNew />
				</Grid>

				<Grid item xs={12} sm={8} md={6} lg={4}>
					<DevicesHousingInsight />
				</Grid>

				<Grid item xs={12} sm={8} md={6} lg={4}>
					<List />
				</Grid>
			</Grid>
		</div>
	);
}
