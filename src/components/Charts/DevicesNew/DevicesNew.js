import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import moment from "moment";
import {ResponsivePie} from "@nivo/pie";

import {
	Avatar,
	Card,
	CardHeader,
	CardContent,
	IconButton,
} from "@material-ui/core";

import PieChartIcon from "@material-ui/icons/PieChart";

import { chartStyles } from "../../../styles/chart";
import DeviceByModelLegend from "./DevicesNewLegend";
import DateRangePicker from "../../../components/DateRangePicker/DateRangePicker";
import QueryLogger from "../../../components/Charts/QueryLogger";
import * as fakeData from "../../../test/data/devicesNew.json";

export default function DevicesNew() {
	const [data, setData] = useState([]);
	const [colors, setColors] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState({});
	const [logQuery, setLogQuery] = useState(false);
	const [reloadData, setReloadData] = useState(false);

	// Properties used by DateRangePicker component.
	const [fromDate, setFromDate] = useState(moment().subtract(7, "day").toDate());
	const [toDate, setToDate] = useState(new Date());

	const classes = chartStyles();

	useEffect( () => {

		async function fetchData(f, t, l) {
			setLoading(true);

			return new Promise((resolve, reject) => {
				resolve(fakeData.default);
			});
		}

		fetchData(fromDate, toDate, reloadData)
			.then(res => {
				setColors(res.colors);
				setData(res.data);
				// setTotal(res.data.total);
			})
			.catch( res => {
				setError("Unknown error occurred.");
			})
			.finally(() => {
				setLoading(false);
			});
	}, [fromDate, toDate, reloadData]);

	const getTooltip = (d) => {
		return `${d.id}: ${d.value} (${d.fmtPct})`;
	};

	const getLabel = (d) => {
		return `${d.id}: ${d.value} (${d.fmtPct})`;
	};

	return (
		<Card className={classes.card} elevation={0}>
			<CardHeader
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
				title="New Widgets"
				subheader={"Undecided subheader"}
			/>

			<CardContent>
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
					<ResponsivePie
						data={ data }
						margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
						innerRadius={0}
						padAngle={0.7}
						cornerRadius={0}
						colors={ colors }
						borderWidth={1}
						borderColor={ { from: "color", modifiers: [ [ "darker", 0.2 ] ] } }
						radialLabel={ d => getLabel(d) }
						radialLabelsSkipAngle={ 10 }
						radialLabelsTextXOffset={ 7 }
						radialLabelsTextColor="#333333"
						radialLabelsLinkOffset={ 7 }
						radialLabelsLinkDiagonalLength={ 20 }
						radialLabelsLinkHorizontalLength={ 24 }
						radialLabelsLinkStrokeWidth={1}
						radialLabelsLinkColor={{ from: "color" }}
						sliceLabel=""
						slicesLabelsSkipAngle={20}
						slicesLabelsTextColor="#333333"
						animate={true}
						tooltip={ d => getTooltip(d) }
						motionStiffness={90}
						motionDamping={15}
						fill={[]}
					/>
				</div>
				<div>
					<DeviceByModelLegend data={data} />
				</div>

				<QueryLogger logQuery={logQuery} setLogQuery={setLogQuery} />
			</CardContent>
		</Card>
	);
}

connect(null, null)(DevicesNew);
