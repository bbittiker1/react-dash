import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import MaterialTable from 'material-table'
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { fetchFirewallBaselines } from "../../../actions/firewall";


export default function FirewallBaselineTable(props) {
    const firewallBaselines = useSelector(state => state.firewall.payload);
    const isLoading = useSelector(state => state.firewall.isFetching);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFirewallBaselines());
    }, [dispatch]);

    const meta = {
        title: 'Baselines',
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

    const all = [5,10,25,50];

    const columns = [{
            title: 'Baselines',
            field: 'baselines',
            filter: false
        }, {
            title: 'Device Class',
            field: 'device_class',
        }, {
            title: 'Device Count',
            field: 'device_count',
            style: { 'overflowWrap': 'break-word' },
            headerStyle: {
                width: '10%',
                textAlign: 'center'
            },
        },
    ];

    return (
        <div>
            <div style={{marginBottom: '20px'}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">{meta.FIREWALL}</Typography>
                    <Typography color="textPrimary">{meta.title}</Typography>
                </Breadcrumbs>
            </div>
            <div>{isLoading && <h6>Loading...</h6>}</div>
            {/*<div>{error && <h6>{error.msg}</h6>}</div>*/}
            <div>
                <MaterialTable
                    title={ meta.title }
                    columns={ columns }
                    data={ firewallBaselines }
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
                            <TablePagination {...props} rowsPerPageOptions={all}
                            />
                        )}}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />
            </div>
        </div>
    )
}
