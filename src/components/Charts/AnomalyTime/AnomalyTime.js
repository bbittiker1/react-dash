import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { ResponsiveBar } from "@nivo/bar";
import {
	Avatar,
	Card,
	CardHeader,
	CardContent,
	IconButton,
} from "@material-ui/core";
import BarChartIcon from "@material-ui/icons/BarChartOutlined";

import axiosInstance from "../../../actions";
import { APIS } from "../../../constants";
import { chartStyles } from "../../../styles/chart";
import DateRangePicker from "../../../components/DateRangePicker/DateRangePicker";
import QueryLogger from "../../../components/Charts/QueryLogger";

export default function AnomalyTime() {
	const [data, setData] = useState([]);
	// const [colors, setColors] = useState([]);
	// const [keys, setKeys] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState({});
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
			return await axiosInstance().get(APIS.anomalyCountByTime(l, formatDate(f),formatDate(t)));
		}

		fetchData(fromDate, toDate, logQuery)
			.then(res => {
				console.log(res.data.data);

				setData(res.data.data);
				// setColors(res.data.colors);
				// setKeys(res.data.keys);
			})
			.catch( res => {
				setError(res?.response?.data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [fromDate, toDate, reloadData]);

	const getTooltip = (d) => {
		return `${d.data.name}: ${d.data.count}`;
	};

	return (
		<Card className={classes.card} elevation={0}>
			<CardHeader style={{paddingBottom: "2px"}}
				classes={{
					title: classes.title,
					subheader: classes.subheader
				}}
				avatar={
					<Avatar aria-label="Top 10 Anomaly Domain Count" className={classes.avatar}>
						<BarChartIcon />
					</Avatar>
				}
				action={
					<IconButton disabled={false} onClick={() => setReloadData(!reloadData)} title={"Refresh"}>
						<i className={isLoading ? "fa fa-refresh fa-spin" : "fa fa-refresh"}  />
					</IconButton>
				}
				title="Anomaly Count By Time"
				subheader={"Undecided subheader"}
			/>

			<CardContent style={{paddingTop: "5px"}}>
				<div>{isLoading ?  "Loading..." : ""}</div>
				<div>{error ? error.msg : ""}</div>

                <DateRangePicker
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    classes={classes}
                />

				<div className={classes.container}>
					<ResponsiveBar
						data={ data }
						keys={ ["count"] }
						indexBy="Day"
						margin={{ top: 10, right: 60, bottom: 60, left: 60 }}
						padding={0.3}
						colors={{ scheme: "nivo" }}
						colorBy={function (e) {
							let t = e.data.Day;
							return e.data[t + "Color"];
						}}
						tooltip={ (d) => getTooltip(d) }
						borderColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
						axisTop={null}
						axisRight={null}
						axisBottom={{
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 30,
							legend: "",
							legendPosition: "middle",
							legendOffset: 50
						}}
						axisLeft={{
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: "anomaly count",
							legendPosition: "middle",
							legendOffset: -40
						}}
						labelSkipWidth={12}
						labelSkipHeight={12}
						labelTextColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
						animate={true}
						motionStiffness={90}
						motionDamping={15}
						groupMode={"grouped"}
						layout={"vertical"}
					/>
				</div>

				<QueryLogger logQuery={logQuery} setLogQuery={setLogQuery} />
			</CardContent>
		</Card>
	);
}

connect(null, null)(AnomalyTime);
