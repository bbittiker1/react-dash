import React, { useEffect } from "react";
import {connect, useDispatch, useSelector} from "react-redux";

import MaterialTable from 'material-table'
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { fetchConvicted } from "../../../actions/convicted";
import ConvictedTableColumns from "./ConvictedTableColumns";

import { getCurrentUserId } from "../../../selectors";


function ConvictedTable(props) {
    const convictedAnomalies = useSelector(state => state.convicted.payload);
    const isLoading = useSelector(state => state.convicted.isFetching);
    const dispatch = useDispatch();
    const currentUserId = getCurrentUserId();

    useEffect(() => {
        dispatch(fetchConvicted());
    }, [dispatch]);

    const meta = {
        TITLE: 'Manually Convicted',
        description: 'About description',
        maxBaselineRows: 4,
        UNPICK: "Unpick",
        PICK: "Pick",
        LOADING: "Loading...",
        BASELINE: "Baseline",
        ANOMALY: "Anomaly",
        ADD_BASELINE: "Add to Baseline",
        MARK_ANOMALY: "Mark as Anomaly",
        FIREWALL: "Firewall",
        ADD_MONITORING: "Add to Monitoring"
    };

    const pagingOptions = [5,10,25,50];

    const columns = ConvictedTableColumns({props, currentUserId});

    return (
        <div>
            <div style={{marginBottom: '20px'}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">{meta.ANOMALY}</Typography>
                    <Typography color="textPrimary">{meta.TITLE}</Typography>
                </Breadcrumbs>
            </div>
            <div>{isLoading && <h6>Loading...</h6>}</div>
            {/*<div>{error && <h6>{error.msg}</h6>}</div>*/}
            <div>
                <MaterialTable
                    title={ meta.TITLE }
                    columns={ columns }
                    data={ convictedAnomalies }
                    options={{
                        filtering: false,
                        pageSize: 10,
                        stripedRows: true,
                        rowStyle: x => {
                            if ( x.tableData.id % 2 ) {
                                return { backgroundColor: "#f2f2f2" }
                            }
                        },
                    }}
                    components={{
                        Pagination: props => (
                            <TablePagination {...props} rowsPerPageOptions={pagingOptions}
                            />
                        )}}
                    // onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />
            </div>
        </div>
    )
}

export default connect(null, null)(ConvictedTable);
