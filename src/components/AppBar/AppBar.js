import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";

import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import { logoutUser } from "../../actions/user";
import IconButton from "@material-ui/core/IconButton";
import { META } from "../../constants/index";
import {theme} from "../../styles/theme";

import { getCurrentUsername } from "../../selectors";

import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";

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
}));

export default function ChangelogAppBar() {
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

connect(null, null)(ChangelogAppBar);
