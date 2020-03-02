import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import MaterialTable from "material-table";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { fetchWidgets } from "../../../actions/widgets";
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
    	widgets: PropTypes.array,
    	isFetching: PropTypes.bool,
    	isFetchingUnpick: PropTypes.bool,
    	isFetchingPick: PropTypes.bool,
    	isFetchingBaseline: PropTypes.bool,
    	error: PropTypes.object,
    };

    static defaultProps = {
    	widgets: [],
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
    	WIDGET: "Widget",
    	ADD_BASELINE: "Add to Baseline",
    	MARK_WIDGET: "Mark as Widget",
    	ADD_MONITORING: "Add to Monitoring"
    };

    componentDidMount() {
    	this.props.dispatch(fetchWidgets());
    }

    render() {
    	let all = [5,10,25,50,(this.props.widgets.length)];

    	return (
    		<div>
    			<div style={{marginBottom: "20px"}}>
    				<Breadcrumbs aria-label="breadcrumb">
    					<Typography color="textPrimary">Widgets</Typography>
    					<Typography color="textPrimary">Changelog</Typography>
    				</Breadcrumbs>
    			</div>
    			<div>
    				<MaterialTable
    					title={ ChangelogTable.meta.title }
    					columns={ ChangelogTableColumns( { props: this.props, currentUserId: this.currentUserId } )}
    					data={ this.props.widgets }
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
		isFetching: state.widgets.isFetching,
		isFetchingUnpick: state.widgets.isFetchingUnpick,
		isFetchingPick: state.widgets.isFetchingPick,
		isFetchingBaseline: state.widgets.isFetchingBaseline,
		widgets: state.widgets.widgets,
		error: state.widgets.error,
	};
}

export default connect(mapStateToProps)(ChangelogTable);
