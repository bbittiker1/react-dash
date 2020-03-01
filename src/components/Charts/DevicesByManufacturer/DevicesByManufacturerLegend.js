import React from "react";

// import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

function Legend({ classes, data }) {
    return (
        <ol className={classes.legend}>
            {data.map(({ id, label, value, color, pct }, i) => {
                const legendItem = `${id}: ${value} (${ pct })`;
                return (
                    <li key={i}>
                        <div className={classes.marker} style={{ backgroundColor: color }} />
                        <div className={classes.hyphen}>-</div>
                        <div style={{ color: "#919EAB" }}>{ legendItem }</div>
                    </li>
                );
            })}
        </ol>
    );
}

const styles = theme => ({
    legend: {
        padding: 0,
        width: "fit-content",
        margin: "0 2px",
        "& li": {
            display: "inline-flex",
            listStyle: "none",
            alignItems: "center",
            marginRight: theme.spacing(1),
            lineHeight: 1,
            fontSize: 12,
            fontWeight: 500
        }
    },
    hyphen: {
        marginRight: theme.spacing(0.5),
        marginLeft: theme.spacing(0.5)
    },
    marker: {
        flexShrink: 0,
        width: 10,
        height: 10,
        borderRadius: 0,
    }
});

export default withStyles(styles)(Legend);
