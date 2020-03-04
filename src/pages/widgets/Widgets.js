import React from "react";
import { Switch, Route, withRouter } from "react-router";

import ChangelogTable from "./changelog/ChangelogTable";
// import Toast from "../../components/Toast/Toast";

class Widgets extends React.Component {
	render() {
		return (
			<Switch>
				<Route path="/app/widgets/changelog" exact component={ ChangelogTable } />
			</Switch>
		);
	}
}

export default withRouter(Widgets);
