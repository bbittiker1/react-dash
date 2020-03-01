import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {ResponsivePie} from "@nivo/pie";

import { APIS } from "../../../constants";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import MoreVert from "@material-ui/icons/MoreVert";
import PieChartIcon from "@material-ui/icons/PieChart";

import axiosInstance from "../../../actions";
import { chartStyles } from "../../../styles/chart";
import DevicesByManufacturerLegend from './DevicesByManufacturerLegend';


export default function DevicesByManufacturer() {
    const [data, setData] = useState([]);
    const [colors, setColors] = useState([]);
    const [isLoading, setLoading] = useState(false);
    // const [total, setTotal] = useState(0);

    const classes = chartStyles();

    useEffect( () => {
        async function fetchData() {
            setLoading(true);
            return await axiosInstance().get(APIS.deviceByManufacturer);
        }

        fetchData()
            .then(res => {
                setColors(res.data.colors);

                // It seems color must be set before data, else throw nivo pieradiallabel error
                setData(res.data.data);

                // setTotal(res.data.total);
            })
            .finally(() => {
                setLoading(false)
            });
    }, []);

    const getLabel = (d) => {
        return `${d.id}: ${d.value} (${ d.pct })`;
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
                title="Total Devices by Manufacturer"
                subheader="Query fptest_iotdevices table group by device_manufacturer. Limit 25"
            />

            <CardContent>
                <div>{isLoading && <h6>Loading...</h6>}</div>
                <div className={classes.container}>
                    <ResponsivePie
                        data={ data }
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0}
                        padAngle={0.7}
                        cornerRadius={0}
                        colors={ colors }
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                        radialLabel={d => getLabel(d) }
                        radialLabelsSkipAngle={ 10 }
                        radialLabelsTextXOffset={6}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkOffset={0}
                        radialLabelsLinkDiagonalLength={16}
                        radialLabelsLinkHorizontalLength={24}
                        radialLabelsLinkStrokeWidth={1}
                        radialLabelsLinkColor={{ from: 'color' }}
                        sliceLabel=""
                        slicesLabelsSkipAngle={ 20 }
                        slicesLabelsTextColor="#333333"
                        animate={true}
                        tooltip={ (d) => getLabel(d) }
                        motionStiffness={90}
                        motionDamping={15}
                        fill={[]}
                    />
                </div>
                <div>
                    <DevicesByManufacturerLegend data={ data } />
                </div>
            </CardContent>
        </Card>

    );
}

connect(null, null)(DevicesByManufacturer);
