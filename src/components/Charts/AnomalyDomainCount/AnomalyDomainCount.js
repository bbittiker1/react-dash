import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import moment from "moment";
import { ResponsiveBar } from "@nivo/bar";

import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Avatar
} from "@material-ui/core";
import BarChartIcon from '@material-ui/icons/BarChartOutlined';

import Legend from "./AnomalyDomainCountLegend";
import axiosInstance from "../../../actions";
import { APIS } from "../../../constants";
import { chartStyles } from "../../../styles/chart"
import DateRangePicker from "../../../components/DateRangePicker/DateRangePicker";
import QueryLogger from "../../../components/Charts/QueryLogger";

export default function AnomalyDomainCount() {
    const [totals, setTotals] = useState([]);
    const [data, setData] = useState([]);
    const [colors, setColors] = useState([]);
    const [keys, setKeys] = useState([]);
    const [error, setError] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [logQuery, setLogQuery] = useState(false);
    const [reloadData, setReloadData] = useState(false);

    // Properties used by DateRangePicker component.
    const [fromDate, setFromDate] = useState(moment().subtract(7, "day").toDate());
    const [toDate, setToDate] = useState(new Date());

    const classes = chartStyles();

    useEffect( () => {
        function formatDate(d) {
            return moment(d).format("YYYY-MM-DD");
        }

        async function fetchData(f, t, l) {
            setLoading(true);
            return await axiosInstance().get(APIS.anomalyDomainCount(l, formatDate(f),formatDate(t)));
        }

        fetchData(fromDate, toDate, reloadData)
            .then(res => {
                setKeys(res.data.keys);
                setTotals(res.data.totals);
                setData(res.data.data);
                setColors(res.data.colors);             
            })
            .catch( res => {
                // console.log(res);
                setError(res?.response?.data);
            })
            .finally(() => {
                setLoading(false)
            });
    }, [fromDate, toDate, reloadData]);

    return (
        <Card className={classes.card} elevation={0}>
            <CardHeader
                classes={{
                    title: classes.title,
                    subheader: classes.subheader
                }}
                avatar={
                    <Avatar aria-label="Top 10 Anomaly Count by Domain" className={classes.avatar}>
                        <BarChartIcon />
                    </Avatar>
                }
                action={
                    <IconButton disabled={false} onClick={() => setReloadData(!reloadData)} title={"Refresh"}>
                        <i className={isLoading ? "fa fa-refresh fa-spin" : "fa fa-refresh"}  />
                    </IconButton>
                }
                title="Top 10 Anomaly Count By Domain"
                subheader={"Undecided subheader"}
            />

            <CardContent>
                <div>{isLoading ? "Loading..." : ""}</div>
                <div className={classes.error}>{error ? error.msg : ""}</div>

                <DateRangePicker
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    classes={classes}
                />

                <div className={classes.container}>
                    <ResponsiveBar
                        data={data}
                        keys={keys}
                        indexBy="Day"
                        margin={{top: 10, right: 60, bottom: 80, left: 60}}
                        padding={0.3}
                        colors={colors}
                        //colorBy="Day"
                        // colorBy={function (e) {
                        //     let t = e.id;
                        //     // console.log(t + "Color - " + e.data["".concat(t, "Color")]);
                        //     return e.data["".concat(t, "Color")];
                        // }}
                        onClick={function (e) {
                            console.log(e);
                        }}
                        borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 30,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'anomaly count',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                        layers={["grid", "axes", "bars", "markers"]}
                        // legends={legends}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        groupMode={"stacked"}
                        layout={"vertical"}
                    />
                </div>

                <div>
                    <Legend data={totals} />
                </div>

                <QueryLogger logQuery={logQuery} setLogQuery={setLogQuery} />
            </CardContent>
        </Card>
    );
}

connect(null, null)(AnomalyDomainCount);
