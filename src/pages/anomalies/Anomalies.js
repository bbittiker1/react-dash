import React from "react";
import { Switch, Route, withRouter } from "react-router";

import ChangelogTable from "./changelog/ChangelogTable";
import {addBaseline, markAnomaly, pickAnomaly, unpickAnomaly} from "../../actions/anomalies";
import Toast from "../../components/Toast/Toast";

class Anomalies extends React.Component {
	render() {
		return (
			<Switch>
				<Route path="/app/anomalies/changelog" exact component={ ChangelogTable } />
			</Switch>
		);
	}
}

export const handlePick = (anomaly, props, currentUserId, clickIdentifier) => {
	props.dispatch(pickAnomaly(anomaly, currentUserId))
		.then(function() {
			Toast({ "type": "success", "msg": "Successfully picked anomaly"});
		}).catch(function(err) {
			Toast({ "type": "error", "error": err });
		});

	return clickIdentifier;
};

export const handleAddBaseline = (anomaly, props, currentUserId, clickIdentifier) => {
	props.dispatch(addBaseline(anomaly, currentUserId))
		.then(function() {
			Toast({ "type": "success", "msg": "Successfully added anomaly to baseline" });
		}).catch(function(err) {
			Toast({"type": "error", "error": err });
		});

	return clickIdentifier;
};

export const handleMarkAnomaly = (anomaly, props, clickIdentifier) => {
	props.dispatch(markAnomaly(anomaly))
		.then(function() {
			Toast({ "type": "success", "msg": "Successfully marked as anomaly" });
		}).catch(function(err) {
			Toast({"type": "error", "error": err});
		});

	return clickIdentifier;
};

export const handleUnpick = (anomaly, props, currentUserId, clickIdentifier) => {
	props.dispatch(unpickAnomaly(anomaly))
		.then(function() {
			Toast({ "type": "success", "msg": "Successfully unpicked anomaly" });
		}).catch(function(err) {
			Toast({ "type": "error", "error": err });
		});

	return clickIdentifier;
};

export default withRouter(Anomalies);
