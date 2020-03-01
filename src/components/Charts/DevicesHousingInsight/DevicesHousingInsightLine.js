import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axiosInstance from "../../../actions";

import { ResponsiveLine } from "@nivo/line";
// import Card from "@material-ui/core/Card";
// import Avatar from "@material-ui/core/Avatar";
// import CardContent from "@material-ui/core/CardContent";
// import CardHeader from "@material-ui/core/CardHeader";
// import IconButton from "@material-ui/core/IconButton";
// import MoreVert from "@material-ui/icons/MoreVert";
// import BarChartIcon from '@material-ui/icons/BarChartOutlined';
import { makeStyles } from "@material-ui/styles";

import { APIS } from "../../../constants";
// import Legend from "./DevicesHousingInsightLegend";

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
        display: 'flex',
        margin: "0 auto",
        height: '500px',
        width: '100%'
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


export default function DevicesHousingInsightLine() {
    // const [meta, setMeta] = useState({});
    // const [colors, setColors] = useState([]);
    // const [keys, setKeys] = useState([]);
    // const [legendKeys, setLegendKeys] = useState([]);
    // const [error, setError] = useState({});
    // const [totals, setTotals] = useState([]);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const classes = chartStyles();

    useEffect( () => {
        async function fetchData() {
            setLoading(true);
            return await axiosInstance().get(APIS.devicesHousingInsight);
        }

        fetchData()
            .then(res => {
                // console.log(res.data.lineChart);
                
                // setKeys(res.data.keys);
                // setLegendKeys(res.data.legendKeys);
                // setTotals(res.data.totals);ch
                setData(res.data.lineChart);
                // setColors(res.data.colors);
                // setMeta(res.data.meta);
            })
            .catch( res => {
                // console.log(res);
                // setError(res?.response?.data);
            })
            .finally(() => {
                setLoading(false)
            });

        // console.log(isLoading);
    }, []);

    // const fromDateLabel = meta ? meta.fromDateLabel : '';
    // const toDateLabel = meta ? meta.toDateLabel : '';
    // const title = "Devices Housing Insight Month Over Month";

    return (
        <div className={classes.container}>
            <ResponsiveLine
                data={ data }
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'nivo' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
}

connect(null, null)(DevicesHousingInsightLine);
