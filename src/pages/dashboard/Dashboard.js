import React from 'react';

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import AnomalyManufacturer from "../../components/Charts/AnomalyManufacturer/AnomalyManufacturer";
import AnomalyTime from "../../components/Charts/AnomalyTime/AnomalyTime";
import AnomalyDomainCount from "../../components/Charts/AnomalyDomainCount/AnomalyDomainCount";
import AnomalyBaselineCount from "../../components/Charts/AnomalyBaselineCount/AnomalyBaselineCount";

import TotalDevicesManufacturer from "../../components/Charts/DevicesByManufacturer/DevicesByManufacturer";
import TotalDevicesModel from "../../components/Charts/DevicesByModel/DevicesByModel";
import DevicesNew from "../../components/Charts/DevicesNew/DevicesNew";
import DevicesHousingInsight from "../../components/Charts/DevicesHousingInsight/DevicesHousingInsight";
// import DevicesHousingInsightLine from "../../components/Charts/DevicesHousingInsight/DevicesHousingInsightLine";

import { theme } from "../../styles/theme";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Dashboard() {
    const classes = useStyles(theme);

    return (
      <div className={classes.root}>
        <div style={{marginBottom: '0px'}}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">Dashboard</Typography>
          </Breadcrumbs>
        </div>

        <Grid container className={classes.root} spacing={4}>
            {/*<Grid item xs={12} sm={8} md={6} lg={4}>*/}
            {/*    <AnomalyTime />*/}
            {/*</Grid>*/}

            {/*<Grid item xs={12} sm={8} md={6} lg={4}>*/}
            {/*  <AnomalyManufacturer />*/}
            {/*</Grid>*/}

            {/*<Grid item xs={12} sm={8} md={6} lg={4}>*/}
            {/*  <AnomalyDomainCount />*/}
            {/*</Grid>*/}

            {/*<Grid item xs={12} sm={8} md={6} lg={4}>*/}
            {/*  <AnomalyBaselineCount />*/}
            {/*</Grid>*/}

            {/*<Grid item xs={12} sm={8} md={6} lg={4}>*/}
            {/*  <TotalDevicesManufacturer />*/}
            {/*</Grid>*/}

            {/*<Grid item xs={12} sm={8} md={6} lg={4}>*/}
            {/*  <TotalDevicesModel />*/}
            {/*</Grid>*/}

            <Grid item xs={12} sm={8} md={6} lg={4}>
              <DevicesNew />
            </Grid>

            {/*<Grid item xs={12} sm={8} md={6} lg={4}>*/}
            {/*  <DevicesHousingInsight />*/}
            {/*</Grid>*/}
        </Grid>
      </div>
    );
}

