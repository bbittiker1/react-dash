import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

function SimpleDialog(props) {
	const { onClose, open } = props;

	const handleClose = (v) => {
		console.log("handleClose");
		onClose(v || "N");
	};

	const handleConfirmClick = value => {
		console.log("handleConfirmClick");
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
			<DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
			<DialogContent>
                Are you sure?
				<Button onClick={ () => handleConfirmClick("Y") }>YES</Button>
				<Button onClick={ () => handleConfirmClick("N") }>NO</Button>
			</DialogContent>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.func.isRequired
};

export default SimpleDialog;
