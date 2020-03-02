import React, { useState }from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { Drawer, List, Divider, IconButton, Collapse, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Home, BugReport, ChangeHistory, ChevronLeft, ChevronRight, ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { theme } from "../../styles/theme";
import {DRAWER_WIDTH} from "../../constants";

const useStyles = makeStyles(theme => ({
	hide: {
		display: "none",
	},
	drawerOpen: {
		width: DRAWER_WIDTH,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1, [theme.breakpoints.up("sm")]: {
			width: theme.spacing(7) + 1,
		},
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
	list: {
		width: 250
	},
	links: {
		textDecoration: "none"
	},
	nestedClosed: {
		paddingLeft: theme.spacing(2),
	},
	nestedOpen: {
		paddingLeft: theme.spacing(4),
	},
}));


export default function ChangelogSideBar() {
	const open = useSelector(state => state.navigation.sidebarOpened);
	const dispatch = useDispatch();
	const classes = useStyles(theme);

	const [openCollapseWidgets, setOpenCollapseWidgets] = useState(false);

	const activeRoute = (routeName) => {
		return window.location.hash.indexOf(routeName) > -1;
	};

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open, })}
			classes={{ paper: clsx({ [classes.drawerOpen]: open, [classes.drawerClose]: !open, }), }}
			transitionDuration={{ enter: 15000, exit: 15000 }}
		>
			<div className={classes.toolbar} style={{backgroundColor: theme.palette.primary.main, borderColorRight: theme.palette.primary.main}}>
				<IconButton onClick={ () => dispatch({ type: "TOGGLE_SIDEBAR" }) }>
					{theme.direction === "rtl" ? <ChevronRight style={{color: "white"}}/> : <ChevronLeft style={{color: "white"}}/>}
				</IconButton>
			</div>

			<Divider />

			<Link to={ "/app/main"} style={{ textDecoration: "none" }} key={ "Dashboard" }>
				<ListItem selected={ activeRoute( "/app/main" )} title="Dashboard">
					<ListItemIcon>
						<Home />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItem>
			</Link>

			<ListItem button onClick={ () => setOpenCollapseWidgets(!openCollapseWidgets) } title="Widgets">
				<ListItemIcon>
					<BugReport />
				</ListItemIcon>
				<ListItemText primary="Widgets" />
				{ openCollapseWidgets ? <ExpandLess/> : <ExpandMore/> }
			</ListItem>

			<Collapse in={ openCollapseWidgets } timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<Link to={ "/app/anomalies/changelog"} style={{ textDecoration: "none" }} key={ "Changelog" }>
						<ListItem button className={clsx(classes.drawer, { [classes.nestedOpen]: open, [classes.nestedClosed]: !open, })}
							selected={ activeRoute( "/app/anomalies/changelog" )} title="Changelog">
							<ListItemIcon>
								<ChangeHistory />
							</ListItemIcon>
							<ListItemText inset primary="Changelog" style={{paddingLeft: "0"}}/>
						</ListItem>
					</Link>
				</List>
			</Collapse>
		</Drawer>
	);
}
