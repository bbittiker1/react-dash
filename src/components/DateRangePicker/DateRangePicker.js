
import React from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

export default function DateRangePicker({ fromDate, setFromDate, toDate, setToDate, classes }) {
	return (
		<div style={{border: ""}}>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<Grid container justify="center" spacing={2} style={{border: ""}}>
					<Grid item xs={10} sm={6} md={6} lg={6}>
						<KeyboardDatePicker
							disableToolbar={false}
							disableFuture={true}
							variant="dialog"
							format="YYYY-MM-DD"
							margin="normal"
							id="fromDate"
							label="From"
							value={fromDate}
							onChange={setFromDate}
							KeyboardButtonProps={{ "aria-label": "change date", }}
							inputVariant={"outlined"}
							InputProps={{ className: classes.text }}
						/>
					</Grid>
					<Grid item xs={10} sm={6} md={6} lg={6}>
						<KeyboardDatePicker
							disableToolbar={false}
							disableFuture={true}
							variant="dialog"
							format="YYYY-MM-DD"
							margin="normal"
							id="toDate"
							label="To"
							value={toDate}
							onChange={setToDate}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
							inputVariant={"outlined"}
							InputProps={{ className: classes.text }}
						/>
					</Grid>
				</Grid>
			</MuiPickersUtilsProvider>
		</div>
	);
}

DateRangePicker.propTypes = {
	fromDate: PropTypes.object.isRequired,
	setFromDate: PropTypes.func.isRequired,
	toDate: PropTypes.object.isRequired,
	setToDate: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
};
