import React from "react";
import Moment from "react-moment";

import IconLoader from "../../../components/IconLoader/IconLoader";

import { theme } from "../../../styles/theme";



function ChangelogTableColumns({ props, currentUserId }) {
	const timeFormatter = (ts) => {
		return (
			<div style={{textAlign: "center"}}>
				<Moment unix key={Math.random().toString()}>{ts}</Moment>
			</div>
		);
	};

	const truncateFormatter = (s) => {
		const t = (s && s.length) > 15 ? s.substring(0, 9) + "..." : s;

		return (
			<div title={t}>{t}</div>
		);
	};

	const baselineFormatter = (row) => {
		function truncate(cell) {
			const maxRows = 8;
			let fmtCell = cell;
			let isTruncated = false;
			if(cell.length > maxRows) {
				fmtCell = cell.slice(0, maxRows);
				isTruncated = true;
			}

			return {fmtCell, isTruncated};
		}

		const uniqueKey = row.id + Math.random().toString();

		if(row) {
			const {fmtCell, isTruncated} = truncate(row.a_bvalues);

			let x = fmtCell.map( (b, i) => (
				<div key={uniqueKey + i}>
					{ b }
				</div>
			));

			if(isTruncated) {
				const moreLink =
                    <React.Fragment key={row.id}>
                    	<div style={{marginTop: "10px", color: theme.palette.linkColor, fontSize: "1rem"}}>
                    		{/*<Button color="link">more...</Button>*/}
                            more...
                    	</div>
                    </React.Fragment>;

				x.push(moreLink);
			}

			return (x);
		} else {
			return (<div key={uniqueKey}/>);
		}
	};


	const statusFormatter = (rowData) => {
		if(rowData.user_id ) {
			return (
				<div style={{textAlign: "center"}}>
					<div>PICKED BY { rowData.user_id === currentUserId ? "You" : rowData.user.username }</div>
					<div>
						{ rowData.picked_at && <p><Moment>{rowData.picked_at}</Moment></p> }
					</div>
				</div>
			);
		} else {
			return (<div>UNPICKED</div>);
		}
	};

	const actionsFormatter = (rowData, props, currentUserId) => {
		return (
			<div style={{marginTop: "1rem", display: "flex", flexDirection: "row"}}>
				{rowData.user_id &&
                <div onClick={ stopPropagation }>
                	<IconLoader
                		buttonId={rowData.id}
                		title="Unpick"
                		iconClass="fa fa-minus"
                		isFetching={ props.isFetchingUnpick }
                		onClick={ () => {} }
                		showConfirm={false}
                	/>
                </div>
				}

				{!rowData.user_id &&
                <div onClick={ stopPropagation }>
                	<IconLoader
                		buttonId={rowData.id}
                		title="Pick"
                		iconClass="fa fa-plus"
                		isFetching={ props.isFetchingPick }
                		onClick={ () => {} }
                		showConfirm={false}
                	/>
                </div>
				}

				{rowData.user_id === currentUserId &&
                <div onClick={ stopPropagation }>
                	<IconLoader
                		title="Add to Baseline"
                		iconClass="fa fa-check"
                		isFetching={props.isFetchingBaseline}
                		onClick={() => {}}
                		showConfirm={true}
                		confirmProps={{
                			confirmText: "Are you sure you want to add to Baseline?",
                			cancelButtonText: "Cancel",
                			okButtonText: "OK"
                		}}
                	/>
                </div>
				}

				{rowData.user_id === currentUserId &&
                <div onClick={ stopPropagation }>
                	<IconLoader
                		buttonId={rowData.id}
                		title="Mark as Widget"
                		iconClass="fa fa-times"
                		isFetching={props.isFetchingMarkAnomaly}
                		onClick={() => {}}
                		showConfirm={true}
                		confirmProps={{
                			confirmText: "Are you sure you want to mark as Widget?",
                			cancelButtonText: "Cancel",
                			okButtonText: "OK"
                		}}
                	/>
                </div>
				}
			</div>
		);
	};

	const stopPropagation = (e) => {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	};

	return [
		{
			title: "Actions",
			field: "dummyActions",
			render: rowData => actionsFormatter(rowData, props, currentUserId),
			filtering: false
		},
		{ title: "Widget", field: "avalues" },
		{
			title: "Widget Class",
			field: "widget_type",
			render: rowData => truncateFormatter(rowData.device_type)
		},
		{
			title: "Widget Time",
			field: "atime",
			style: { "overflowWrap": "break-word" },
			headerStyle: {
				width: "10%",
				textAlign: "center"
			},
			render: rowData => timeFormatter(rowData.atime),
			filtering: false
		},
		{
			title: "Detection Time",
			field: "atime",
			style: { "overflowWrap": "break-word" },
			headerStyle: {
				width: "10%",
				textAlign: "center"
			},
			render: rowData => timeFormatter(rowData.dtime),
			filtering: false
		},
		{
			title: "Status",
			field: "dummyStatus",
			headerStyle: {
				width: "15%",
				textAlign: "center"
			},
			style: { "overflowWrap": "break-word", "textAlign": "center" },
			render: rowData => statusFormatter(rowData),
			filtering: false
		},
	];}

export default ChangelogTableColumns;


