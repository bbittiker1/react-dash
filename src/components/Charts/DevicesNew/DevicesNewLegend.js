import React from "react";

import MaterialTable from 'material-table'
import TablePagination from '@material-ui/core/TablePagination';
// import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const columns = [
    {
        title: 'Device',
        field: 'id',
    },
    {
        title: 'Count',
        field: 'value',
        filtering: false
    },
    {
        title: '%',
        field: 'fmtPct',
        filtering: false,
        customSort: (a, b) => a.value - b.value
    },
];

function Legend({ classes, data }) {
    const pagingOptions = [5, 10, 20, 50, (data.length)];

    return (
        <div>
            <MaterialTable
                title=""
                columns={ columns }
                data={ data }
                // detailPanel={ rowData => ( <ChangelogTablePanelDetail
                //     parentProps={this.props}
                //     rowData={rowData}
                //     currentUserId={ this.currentUserId }/> )}
                options={{
                    filtering: true,
                    pageSize: 5,
                    stripedRows: true,
                    search: false,
                    rowStyle: x => {
                        if ( x.tableData.id % 2 ) {
                            return { backgroundColor: "#f2f2f2" }
                        }
                    },
                    toolbar: false
                }}
                components={{
                    Pagination: props => (
                        <TablePagination
                            {...props}
                            rowsPerPageOptions={pagingOptions}
                        />
                    )}}
                // onRowClick={(event, rowData, togglePanel) => togglePanel()}
            />
        </div>
    );
}

const styles = theme => ({
    legend: {
        padding: 0,
        width: "fit-content",
        margin: "0 2px",
        "& li": {
            display: "inline-flex",
            listStyle: "none",
            alignItems: "center",
            marginRight: theme.spacing(1),
            lineHeight: 1,
            fontSize: 12,
            fontWeight: 500
        }
    },
    hyphen: {
        marginRight: theme.spacing(0.5),
        marginLeft: theme.spacing(0.5)
    },
    marker: {
        flexShrink: 0,
        width: 10,
        height: 10,
        borderRadius: 0,
    }
});

export default withStyles(styles)(Legend);
