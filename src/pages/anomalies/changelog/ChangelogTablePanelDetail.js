import React from "react";
import Moment from "react-moment";

import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import BugReport from "@material-ui/icons/BugReport";
import CallToAction from "@material-ui/icons/CallToAction";
import TableChart from "@material-ui/icons/TableChart";
import MoreVert from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/core/styles";

import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";

import {
	handleUnpick,
	handleAddBaseline,
	handleMarkAnomaly,
	handlePick
} from "../Anomalies";

const meta = {
	"UNPICK": "Unpick",
	"PICK": "Pick",
	"LOADING": "Loading...",
	"ADD_BASELINE": "Add Baseline",
	"MARK_ANOMALY": "Mark Anomaly",
	"ADD_MONITORING": "Add Monitoring"
};

const styles = theme => ({
	flexContainer: {
		display: "flex",
		flexWrap: "nowrap",
		// backgroundColor: theme.palette.secondary.main,
		justifyContent: "center",
		alignContent: "center",
		flexDirection: "row",
		backgroundColor: "#f1f1f1"
	},

	flexColumn: {
		margin: "10px",
		textAlign: "left",
		fontSize: "12px",
		overFlowWrap: "break-word",
		padding: "10px",
		color: theme.palette.textColor
	},

	flexLabel: {
		textAlign: "center",
		marginBottom: "10px",
		fontSize: "18px"
	},
});

class ChangelogTablePanelDetail extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.parentProps = props.parentProps;
		this.rowData = props.rowData;
		this.currentUserId = props.currentUserId;
	}

    static meta = {
    	title: "Anomalies list",
    	description: "About description",
    	maxBaselineRows: 4,
    	UNPICK: "Unpick",
    	PICK: "Pick",
    	LOADING: "Loading...",
    	BASELINE: "Baseline",
    	ANOMALY: "Anomaly",
    	ADD_BASELINE: "Add to Baseline",
    	MARK_ANOMALY: "Mark as Anomaly",
    	ADD_MONITORING: "Add to Monitoring"
    };

    render() {
    	let onClick = (this.rowData.user_id) ? handleUnpick : handlePick;
    	let buttonText = (this.rowData.user_id) ? meta.UNPICK : meta.PICK;
    	let handleType = (this.rowData.user_id) ? this.parentProps.isFetchingUnpick: this.parentProps.isFetchingPick;

    	const { classes } = this.props;

    	return (
    		<div className={classes.flexContainer}>
    			<Card className={classes.flexColumn} elevation={0}>
    				<CardHeader
    					classes={{
    						title: "",
    						subheader: ""
    					}}
    					avatar={
    						<Avatar aria-label={""} className={""}>
    							<BugReport />
    						</Avatar>
    					}
    					action={
    						<IconButton disabled={true}>
    							<MoreVert className="" />
    						</IconButton>
    					}
    					title="Widget"
    					// subheader={`From ${fromDateLabel} to ${toDateLabel}`}
    				/>
    				<CardContent>
    					<div>ID: {this.rowData.id}</div>
    					<div>Widget ID: {this.rowData.widget_id}</div>
    					<div>Widget Class: {this.rowData.widget_type}</div>
    					<div>User Id: { this.rowData.user_id ? this.rowData.user_id : "UNPICKED" }</div>
    					<div>Widget Time: <Moment unix>{this.rowData.atime}</Moment></div>
    					<div>Detection Time: <Moment unix>{this.rowData.dtime}</Moment></div>
    					<div style={{marginBottom: "3px"}}>Baseline: </div>
    				</CardContent>
    			</Card>

    			<Card className={classes.flexColumn} elevation={0}>
    				<CardHeader
    					classes={{
    						title: "",
    						subheader: ""
    					}}
    					avatar={
    						<Avatar aria-label={""} className={""}>
    							<CallToAction />
    						</Avatar>
    					}
    					action={
    						<IconButton disabled={true}>
    							<MoreVert className="" />
    						</IconButton>
    					}
    					title="Actions"
    					// subheader={`From ${fromDateLabel} to ${toDateLabel}`}
    				/>
    				<CardContent>
    					<div>
    						{/*<div className={classes.flexLabel}>Actions</div>*/}
    						<ButtonLoader
    							buttonId={ this.rowData.id }
    							isFetching={ handleType }
    							onClick={() => onClick(this.rowData, this.parentProps, this.currentUserId, this.rowData.id)}
    							buttonText={buttonText}
    							fetchingButtonText={meta.LOADING}
    							block={ true }
    							color="primary"
    							showConfirm={ false }
    							size="small"
    							fullWidth={true}
    							variant="contained"
    						/>

    						{this.rowData.user_id === this.currentUserId &&
                            <ButtonLoader
                            	buttonId={this.rowData.id}
                            	isFetching={this.props.isFetchingMarkAnomaly}
                            	onClick={ () => handleMarkAnomaly(this.rowData, this.parentProps, this.rowData.id) }
                            	buttonText={"Mark Widget"}
                            	fetchingButtonText={meta.LOADING}
                            	block={true}
                            	color="secondary"
                            	fullWidth={true}
                            	size="small"
                            	showConfirm={true}
                            	variant="outlined"
                            	confirmProps={{
                            		confirmText: "Are you sure you want to mark as Anomaly?",
                            		cancelButtonText: "Cancel",
                            		okButtonText: "OK"
                            	}} /> }
    					</div>
    				</CardContent>
    			</Card>
    		</div>
    	);
    }
}


export default withStyles(styles, {withTheme: true})(ChangelogTablePanelDetail);
