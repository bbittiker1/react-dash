import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {ResponsivePie} from "@nivo/pie";

import { APIS } from "../../../../constants";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import MoreVert from "@material-ui/icons/MoreVert";
import PieChartIcon from "@material-ui/icons/PieChart";

import axiosInstance from "../../../../actions";
import {chartStyles} from "../../../../styles/chart";

export default function DevicesModel() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const classes = chartStyles();

    useEffect( () => {
        async function fetchData() {
            setLoading(true);
            return await axiosInstance().get(APIS.devicesByModel);
        }

        fetchData()
            .then(res => {
                setTotal(res.data.total);
                setData(res.data.result);
            })
            .finally(() => {
                setLoading(false)
            });
    }, []);

    const fmtPercent = (d) => {
        if(!d) {
            return 0;
        }

        return ((d / total) * 100).toFixed(2)

    };

    const getSliceLabel = (d) => {
        return `${ fmtPercent(d.value) }%`
    };

    const getTooltip = (d) => {
        return `${d.id} (${d.value}) ${ fmtPercent(d.value) }%`;
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
                    <IconButton disabled={true}>
                        <MoreVert className={classes.menuIcon} />
                    </IconButton>
                }
                title="Devices By Model"
                subheader=""
            />

            <CardContent>
                <div>{isLoading && <h6>Loading...</h6>}</div>
                <div className={classes.container}>
                    <ResponsivePie
                        data={data}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0}
                        padAngle={0.7}
                        cornerRadius={0}
                        colors={{ scheme: 'nivo' }}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                        radialLabel={d => `${d.id} (${d.value})`}
                        radialLabelsSkipAngle={10}
                        radialLabelsTextXOffset={6}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkOffset={0}
                        radialLabelsLinkDiagonalLength={16}
                        radialLabelsLinkHorizontalLength={24}
                        radialLabelsLinkStrokeWidth={1}
                        radialLabelsLinkColor={{ from: 'color' }}
                        sliceLabel={ (d) => getSliceLabel(d) }
                        slicesLabelsSkipAngle={10}
                        slicesLabelsTextColor="#333333"
                        animate={true}
                        tooltip={ (d) => getTooltip(d) }
                        motionStiffness={90}
                        motionDamping={15}
                        fill={[]}
                        // legends={[
                        //     {
                        //         anchor: 'bottom',
                        //         direction: 'row',
                        //         translateY: 56,
                        //         itemWidth: 100,
                        //         itemHeight: 18,
                        //         itemTextColor: '#999',
                        //         symbolSize: 12,
                        //         symbolShape: 'square',
                        //         effects: [
                        //             {
                        //                 on: 'hover',
                        //                 style: {
                        //                     itemTextColor: '#000'
                        //                 }
                        //             }
                        //         ]
                        //     }
                        // ]}
                    />
                </div>
            </CardContent>
        </Card>

    );
}

connect(null, null)(DevicesModel);
