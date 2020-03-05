import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";

import clsx from "clsx";

import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Menu,
	MenuItem,
	IconButton,
	Avatar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import { logoutUser } from "../../actions/user";

import { META } from "../../constants/index";
import {theme} from "../../styles/theme";

import { getCurrentUsername } from "../../selectors";

import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import loggedInUserImage from "../../images/wileecoyote.jpeg";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: theme.drawer.width,
		width: `calc(100% - ${theme.drawer.width}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: "none",
	},
	companyHeaderAvatar: {
		width: "120px",
		height: "120px",
		borderRadius: "120",
		backgroundClip: "padding-box",
		margin: "7px 0 0 5px",
		float: "left",
		backgroundSize: "cover",
		backgroundPosition: "center center"
	},
	companyAvatar: {
		width: theme.spacing(7),
		height: theme.spacing(7),
		marginRight: "5px"
	},
}));

export default function DashAppBar() {
	const classes = useStyles(theme);
	const open = useSelector(state => state.navigation.sidebarOpened);
	const dispatch = useDispatch();
	const currentUserName = getCurrentUsername();

	return (
		<AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={ () => dispatch({ type: "TOGGLE_SIDEBAR" }) }
					edge="start"
					className={clsx(classes.menuButton, { [classes.hide]: open, })}
				>
					<MenuIcon />
				</IconButton>

				<Typography variant="h6" noWrap style={{flex: 1}}>
					{META.app.title}
				</Typography>

				<PopupState variant="popover" popupId="demo-popup-menu">
					{popupState => (
						<React.Fragment>
							<Button  {...bindTrigger(popupState)} variant="contained" color="primary" disableElevation>
								<Avatar alt="Remy Sharp" src={loggedInUserImage} className={classes.large} />
								<span>
									{currentUserName}
								</span>
								<span style={{marginLeft: "3px", paddingTop: "5px"}}>
									<KeyboardArrowDownRoundedIcon />
								</span>
							</Button>

							<Menu {...bindMenu(popupState)}>
								<MenuItem onClick={ () => dispatch(logoutUser()) }>{META.action.logout}</MenuItem>
							</Menu>
						</React.Fragment>
					)}
				</PopupState>
			</Toolbar>
		</AppBar>
	);
}

connect(null, null)(DashAppBar);
