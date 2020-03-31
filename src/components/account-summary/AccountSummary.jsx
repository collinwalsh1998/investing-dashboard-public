//import react framework
import React from "react";

//import utils
import DataParser from "../../utils/data-parser";

//import styles
import "./AccountSummary.scss";

class AccountSummary extends React.Component {
	constructor(props) {
		super(props);

		this.dataParser = new DataParser();
	}

	render() {
		//const balances = this.props.balances;

		return (
			<div id="account-summary-section" className="account-summary-component">
				<p>Account Summary</p>
			</div>
		);
	}
}

export default AccountSummary;