import React, { useState }from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Home from "@material-ui/icons/Home";
import BugReport from "@material-ui/icons/BugReport";
import ChangeHistory from "@material-ui/icons/ChangeHistory";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import TouchApp from "@material-ui/icons/TouchApp";
import Fireplace from "@material-ui/icons/Fireplace";
import AllInclusive from "@material-ui/icons/AllInclusive";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DevicesOtherIcon from "@material-ui/icons/DevicesOther";

import clsx from "clsx";
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


export default function ChangelogSideBar(props) {
	const open = useSelector(state => state.navigation.sidebarOpened);
	const dispatch = useDispatch();
	const classes = useStyles(theme);

	const [openCollapseAnomalies, setOpenCollapseAnomalies] = useState(false);
	const [openCollapseFirewall, setOpenCollapseFirewall] = useState(false);

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

			<ListItem button onClick={ () => setOpenCollapseAnomalies(!openCollapseAnomalies) } title="Anomalies">
				<ListItemIcon>
					<BugReport />
				</ListItemIcon>
				<ListItemText primary="Anomalies" />
				{ openCollapseAnomalies ? <ExpandLess/> : <ExpandMore/> }
			</ListItem>

			<Collapse in={ openCollapseAnomalies } timeout="auto" unmountOnExit>
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
					<Link to={ "/app/anomalies/convicted"} style={{ textDecoration: "none" }} key={ "ManuallyConvicted" }>
						<ListItem button className={clsx(classes.drawer, { [classes.nestedOpen]: open, [classes.nestedClosed]: !open, })}
							selected={ activeRoute( "/app/anomalies/convicted" )} title="Manually Convicted">
							<ListItemIcon>
								<TouchApp />
							</ListItemIcon>
							<ListItemText inset primary="Manually Convicted" style={{paddingLeft: "0"}}/>
						</ListItem>
					</Link>
				</List>
			</Collapse>

			<ListItem button onClick={ () => setOpenCollapseFirewall(!openCollapseFirewall) } title="Firewall">
				<ListItemIcon>
					<Fireplace />
				</ListItemIcon>
				<ListItemText primary="Firewall" />
				{ openCollapseFirewall ? <ExpandLess/> : <ExpandMore/> }
			</ListItem>

			<Collapse in={ openCollapseFirewall } timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<Link to={ "/app/firewall/baseline"} style={{ textDecoration: "none" }} key={ "FirewallBaseline" }>
						<ListItem button className={clsx(classes.drawer, { [classes.nestedOpen]: open, [classes.nestedClosed]: !open, })}
							selected={ activeRoute( "/app/firewall/baseline" )} title="Firewall Baseline">
							<ListItemIcon>
								<AllInclusive />
							</ListItemIcon>
							<ListItemText inset primary="Baseline" style={{paddingLeft: "0"}}/>
						</ListItem>
					</Link>
				</List>
			</Collapse>

			<Link to={ "/app/devices"} style={{ textDecoration: "none" }} key={ "Devices" }>
				<ListItem selected={ activeRoute( "/app/devices" )} title="Devices">
					<ListItemIcon>
						<DevicesOtherIcon />
					</ListItemIcon>
					<ListItemText primary="Devices" />
				</ListItem>
			</Link>
		</Drawer>
	);
}
