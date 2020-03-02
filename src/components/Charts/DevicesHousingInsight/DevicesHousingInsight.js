import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { ResponsiveBar } from "@nivo/bar";
import { Card, Avatar, CardContent, CardHeader, IconButton } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import BarChartIcon from "@material-ui/icons/BarChartOutlined";
import { makeStyles } from "@material-ui/styles";

import Legend from "./DevicesHousingInsightLegend";

import * as fakeData from "../../../test/data/housingInsight.json";

const chartStyles = makeStyles(theme => ({
	card: {
		border: "1px solid #e9ecee",
		// maxWidth: '1000px',
		margin: "24px auto"
	},
	avatar: {
		background: theme.palette.primary.main,
		// color: "#01CEFC"
	},
	container: {
		display: "flex",
		margin: "0 auto",
		height: "500px",
		width: "100%"
	},
	menuIcon: {
		color: "#C8D1DA"
	},
	title: {
		color: "#232427",
		fontSize: 15,
		fontWeight: 500,
		fontFamily: "'Poppins', sans-serif",
		lineHeight: "1.35417em",
		textAlign: "left"
	},
	subheader: {
		color: "#919eab",
		fontFamily: "'Nunito', sans-serif",
		fontSize: 12,
		fontWeight: 500,
		textAlign: "left"
	},
	info: {
		margin: "24 24"
	},
	text: {
		color: "#383a40",
		fontFamily: "'Nunito', sans-serif",
		fontSize: 14,
		fontWeight: 400
	}
}));


export default function DevicesHousingInsight() {
	// const [totals, setTotals] = useState([]);
	const [data, setData] = useState([]);
	const [colors, setColors] = useState([]);
	const [keys, setKeys] = useState([]);
	const [legendKeys, setLegendKeys] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({});

	const classes = chartStyles();

	useEffect( () => {
		async function fetchData() {
			setLoading(true);

			return new Promise((resolve ) => {
				resolve(fakeData.default);
			});
		}

		fetchData()
			.then(res => {
				setKeys(res.keys);
				setLegendKeys(res.legendKeys);
				// setTotals(res.data.totals);
				setData(res.data);
				setColors(res.colors);
				// setMeta(res.data.meta);
			})
			.catch( () => {
				setError("Unknown error occurred.");
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const title = "Widget Insight Month Over Month";

	return (
		<Card className={classes.card} elevation={0}>
			<CardHeader
				classes={{
					title: classes.title,
					subheader: classes.subheader
				}}
				avatar={
					<Avatar aria-label={title} className={classes.avatar}>
						<BarChartIcon />
					</Avatar>
				}
				action={
					<IconButton disabled={true}>
						<MoreVert className={classes.menuIcon} />
					</IconButton>
				}
				title={title}
				subheader={"Undecided subheader"}
			/>

			<CardContent>
				<div>{error && <h6>{error.msg}</h6>}</div>
				<div>{loading && <h6>Loading...</h6>}</div>
				<div className={classes.container}>
					<ResponsiveBar
						data={ data }
						keys={ keys }
						indexBy="name"
						margin={{top: 10, right: 60, bottom: 80, left: 60}}
						padding={0.3}
						colors={ colors }
						//colorBy="Day"
						// colorBy={function (e) {
						//     let t = e.id;
						//     // console.log(t + "Color - " + e.data["".concat(t, "Color")]);
						//     return e.data["".concat(t, "Color")];
						// }}
						onClick={function (e) {
							console.log(e);
						}}
						borderColor={{from: "color", modifiers: [["darker", 1.6]]}}
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
							legend: "total devices",
							legendPosition: "middle",
							legendOffset: -55
						}}
						labelSkipWidth={12}
						labelSkipHeight={12}
						labelTextColor={{from: "color", modifiers: [["darker", 1.6]]}}
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
					<Legend data={ legendKeys } />
				</div>
			</CardContent>
		</Card>
	);
}

connect(null, null)(DevicesHousingInsight);
