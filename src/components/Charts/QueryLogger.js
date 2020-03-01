import React from "react";
import config from "../../config";
import {Checkbox, Divider, FormControlLabel, Grid} from "@material-ui/core";

export default function QueryLogger({ logQuery, setLogQuery }) {
    return (
        <div style={{display: config.environment === "production"  ? "none": "block", border: "", marginTop: "10px"}}>
            <Divider variant="middle" />
            <div>
                <Grid container direction="row" justify="center" spacing={2}  >
                    <Grid item xs={12} sm={10} md={8} lg={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={logQuery}
                                    onChange={() => setLogQuery(!logQuery)}
                                    value="logQuery"
                                    color="secondary"
                                    size={"small"}
                                />
                            }
                            label="Log Query"
                        />
                    </Grid>
                </Grid>
            </div>
            <div style={{marginTop: "5px", marginLeft: "15px"}}>* Development only</div>
        </div>
    );
}
