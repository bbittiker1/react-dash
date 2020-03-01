import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import MaterialTable from "material-table";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import {fetchAnomalies, fetchWidgets} from "../../../actions/anomalies";
import ChangelogTableColumns from "./ChangelogTableColumns";
import ChangelogTablePanelDetail from "./ChangelogTablePanelDetail";
import { getCurrentUserId } from "../../../selectors";

class ChangelogTable extends Component {
	constructor(props) {
		super(props);
		this.currentUserId = getCurrentUserId();
	}

    static propTypes = {
    	dispatch: PropTypes.func.isRequired,
    	anomalies: PropTypes.array,
    	isFetching: PropTypes.bool,
    	isFetchingUnpick: PropTypes.bool,
    	isFetchingPick: PropTypes.bool,
    	isFetchingBaseline: PropTypes.bool,
    	error: PropTypes.object,
    };

    static defaultProps = {
    	anomalies: [],
    	isFetching: false,
    	error: null
    };

    static meta = {
    	title: "Changelog",
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

    componentDidMount() {
    	this.props.dispatch(fetchWidgets());
    }

    render() {
    	let all = [5,10,25,50,(this.props.anomalies.length)];

    	return (
    		<div>
    			<div style={{marginBottom: "20px"}}>
    				<Breadcrumbs aria-label="breadcrumb">
    					{/*<Link color="inherit" href="/" >*/}
    					{/*    Anomalies*/}
    					{/*</Link>*/}
    					<Typography color="textPrimary">Widgets</Typography>
    					<Typography color="textPrimary">Changelog</Typography>
    				</Breadcrumbs>
    			</div>
    			<div>
    				<MaterialTable
                        title={ ChangelogTable.meta.title }
    					columns={ ChangelogTableColumns( { props: this.props, currentUserId: this.currentUserId } )}
    					data={ this.props.anomalies }
    					detailPanel={ rowData => ( <ChangelogTablePanelDetail
    						parentProps={this.props}
    						rowData={rowData}
    						currentUserId={ this.currentUserId }/> )}
    					options={{
    						filtering: true,
    						pageSize: 10,
    						stripedRows: true,
    						rowStyle: x => {
    							if ( x.tableData.id % 2 ) {
    								return { backgroundColor: "#f2f2f2" };
    							}
    						},
    					}}
    					components={{
    						Pagination: props => (
    							<TablePagination
    								{...props}
    								rowsPerPageOptions={all}
    							/>
    						)}}
    					onRowClick={(event, rowData, togglePanel) => togglePanel()}
    				/>
    			</div>
    		</div>
    	);
    }
}

function mapStateToProps(state) {
	return {
		isFetching: state.anomalies.isFetching,
		isFetchingUnpick: state.anomalies.isFetchingUnpick,
		isFetchingPick: state.anomalies.isFetchingPick,
		isFetchingBaseline: state.anomalies.isFetchingBaseline,
		isFetchingMarkAnomaly: state.anomalies.isFetchingMarkAnomaly,
		anomalies: state.anomalies.anomalies,
		error: state.anomalies.error,
	};
}

export default connect(mapStateToProps)(ChangelogTable);
