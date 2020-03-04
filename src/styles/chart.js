import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./theme";

console.log(theme);

export const chartStyles = makeStyles  (theme => ({
	card: {
		border: "1px solid #e9ecee",
		maxWidth: "748px",
		// maxHeight: "500px",
		margin: "24px auto"
	},
	avatar: {
		background: theme.palette.primary.main,
		// color: "#01CEFC"
	},
	container: {
		display: "flex",
		margin: "0 auto",
		height: "260px",
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
	},
	error: {
		color: theme.palette.error.main
	},
	infiniteScrollLoader: {
		height: "70px",
		margin: "30px",
		color: theme.palette.primary.main
	}
}));



// export const chartStyles = useStyles(theme);
