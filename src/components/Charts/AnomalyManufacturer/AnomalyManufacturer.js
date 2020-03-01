import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import moment from "moment";
import {ResponsivePie} from "@nivo/pie";

import {
    Card,
    CardHeader,
    Avatar,
    IconButton,
    CardContent
} from "@material-ui/core";
import PieChartIcon from "@material-ui/icons/PieChart";

import axiosInstance from "../../../actions";
import {APIS} from "../../../constants";
import { chartStyles } from "../../../styles/chart"
import Legend from "./AnomalyManufacturerLegend";
import DateRangePicker from "../../../components/DateRangePicker/DateRangePicker";
import QueryLogger from "../../../components/Charts/QueryLogger";


export default function AnomalyManufacturer() {
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({});
    const [colors, setColors] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const [logQuery, setLogQuery] = useState(false);

    // Properties used by DateRangePicker component.
    const [fromDate, setFromDate] = useState(moment().subtract(7, "day").toDate());
    const [toDate, setToDate] = useState(new Date());

    const classes = chartStyles();

    useEffect( (f, t, l) => {
        function formatDate(d) {
            return moment(d).format("YYYY-MM-DD");
        }

        async function fetchData(f, t, l) {
            setLoading(true);
            return await axiosInstance().get(APIS.anomalyCountByMan(l, formatDate(f),formatDate(t)));
        }

        fetchData(fromDate, toDate, logQuery)
            .then(res => {
                setData(res.data.data);
                setMeta(res.data.meta);
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
            <CardHeader style={{paddingBottom: "2px"}}
                classes={{
                    title: classes.title,
                    subheader: classes.subheader
                }}
                avatar={
                    <Avatar aria-label="Top 10 Anomaly Domain Count" className={classes.avatar}>
                        <PieChartIcon />
                    </Avatar>
                }
                action={
                    <IconButton disabled={false} onClick={() => setReloadData(!reloadData)} title={"Refresh"}>
                        <i className={isLoading ? "fa fa-refresh fa-spin" : "fa fa-refresh"}  />
                    </IconButton>
                }
                title="Anomaly Count By Manufacturer"
                subheader={"Undecided subheader"}
            />

            <CardContent style={{paddingTop: "5px"}}>
                <div>{isLoading ?  "Loading..." : ""}</div>
                <div className={classes.error}>{error ? error.msg : ""}</div>

                <DateRangePicker
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    classes={classes}
                />

                <div className={classes.container}>
                    <ResponsivePie
                        data={data}
                        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={0}
                        colors={colors}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                        radialLabelsSkipAngle={10}
                        radialLabelsTextXOffset={6}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkOffset={0}
                        radialLabelsLinkDiagonalLength={16}
                        radialLabelsLinkHorizontalLength={24}
                        radialLabelsLinkStrokeWidth={1}
                        radialLabelsLinkColor={{ from: 'color' }}
                        slicesLabelsSkipAngle={10}
                        slicesLabelsTextColor="#333333"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        defs={[
                            {
                                "id": "dots",
                                "type": "patternDots",
                                "background": "inherit",
                                "color": "rgba(255, 255, 255, 0.3)",
                                "size": 4,
                                "padding": 1,
                                "stagger": true
                            },
                            {
                                "id": "lines",
                                "type": "patternLines",
                                "background": "inherit",
                                "color": "rgba(255, 255, 255, 0.3)",
                                "rotation": -45,
                                "lineWidth": 6,
                                "spacing": 10
                            }
                        ]}
                        fill={[
                            {
                                "match": {
                                    "id": "ruby"
                                },
                                "id": "dots"
                            },
                            {
                                "match": {
                                    "id": "c"
                                },
                                "id": "dots"
                            },
                            {
                                "match": {
                                    "id": "go"
                                },
                                "id": "dots"
                            },
                            {
                                "match": {
                                    "id": "python"
                                },
                                "id": "dots"
                            },
                            {
                                "match": {
                                    "id": "scala"
                                },
                                "id": "lines"
                            },
                            {
                                "match": {
                                    "id": "lisp"
                                },
                                "id": "lines"
                            },
                            {
                                "match": {
                                    "id": "elixir"
                                },
                                "id": "lines"
                            },
                            {
                                "match": {
                                    "id": "javascript"
                                },
                                "id": "lines"
                            }
                        ]}
                    />
                </div>

                <div>
                    <Legend data={data} />
                </div>

                <QueryLogger logQuery={logQuery} setLogQuery={setLogQuery} />

            </CardContent>
        </Card>


    );
}

connect(null, null)(AnomalyManufacturer);
